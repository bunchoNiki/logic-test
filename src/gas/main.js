
/**
 * 出題内容の通知.
 */
const notifyNewAssignment = () => {
  const [quNumber] = getLastAssignment();
  const reg = new RegExp('qu' + (quNumber + 1));

  const pr = getPullRequests().filter(({title}) => reg.test(title));
  const [title] = pr[0].title.split('by')
  const [sample] = pr.filter(({ title }) => /サンプル/.test(title));
  const [ai] = pr.filter(({ title }) => /ai_sample/.test(title));

  const message = `今回の問題\n${title}\n出題ブランチ:<${'https://github.com/bunchoNiki/logic-test/tree/' + 'qu' + (quNumber + 1)}|親ブランチ>\n\nサンプル: <${sample.html_url}|サンプルの回答>\nAI生成データ: <${ai.html_url}|AIが生成したバグありコード>`;
  slackActiveUserNotify(message);

  addAssignment(quNumber + 1, title);
};

const doGet = (e) => {
  try {
    const params = e.parameter;
    const { branch } = params;
    logToSheet(branch);
    const [quNum, employeeId] = branch.split('-');
    const userId = employeeIdToUserId(employeeId);
    const pr = getMyPullRequest(quNum, employeeId);
    postMessage(userId, `<${pr.html_url}|${pr.title}>\nレビューコメントがされました！\n\n確認してみましょう💡`);
    return ContentService.createTextOutput('success');
  } catch (e) {
    logToSheet(e.stack, true);
  }
};

/**
 * 社員番号からユーザーIDの取得.
 */
const employeeIdToUserId = (employeeId) => {
  const app = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = app.getSheetByName(MEMBER_SHEET);

  const range = sheet.getDataRange();
  const values = range.getValues();
  const [row] = values.filter(([,,eid]) => eid === employeeId);

  return row[USER_ID_INDEX];
};

/**
 * 回答を受けたPRの取得
 */
const getMyPullRequest = (qu, employeeId) => {
  const pr = getPullRequests();

  const reg = new RegExp(`【${qu}】.+by ${employeeId}`);
  const [currentPr] = pr.filter(({title}) => reg.test(title));

  return currentPr;
};

const doPost = (e) => {
  try {
    if (e.parameter.payload) {
      doPostShortcut(e.parameter.payload);
      return ContentService.createTextOutput('');
    }

    const payload = JSON.parse(e.postData.contents);

    if (payload.type === 'url_verification') {
      return ContentService.createTextOutput(payload.challenge);
    }
    if (payload.event && payload.event.type === 'app_home_opened') {
      const userId = payload.event.user;
      updateHome(userId);
    }
    return ContentService.createTextOutput('');
  } catch (e) {
    logToSheet(e.stack, true);
  }
};

/**
 * ショートカットによる呼び出し処理.
 */
const doPostShortcut = (payloadStr) => {
  const payload = JSON.parse(payloadStr);

  if (payload.type === 'shortcut') {
    const callbackId = payload.callback_id;
    const userId = payload.user.id;

    updateUserStatus({id: userId, status: callbackId });
    postMessage(userId, MESSAGES[callbackId]);
  }
};

/**
 * user statusの更新.
 */
const updateUserStatus = ({ id: userId, status }) => {
  const app = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = app.getSheetByName(MEMBER_SHEET);

  const range = sheet.getDataRange();
  const values = range.getValues();
  const index = values.findIndex(([id]) => id === userId);

  if (index === NON_INDEX) {
    const employeeId = getProfile(userId);
    sheet.appendRow([userId, status, "'" + employeeId]);
  } else {
    const rowIndex = index + 1;
    sheet.getRange(rowIndex, 1, 1, 2).setValues([[userId, status]]);
  }

}

/**
 * メッセージ送信.
 */
const postMessage = (userId, message) => {
    const conversationsOpenUrl = 'https://slack.com/api/conversations.open';
    const options = {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: 'Bearer ' + SLACK_BOT_TOKEN
      },
      payload: JSON.stringify({
        users: userId
      })
    };

    const response = UrlFetchApp.fetch(conversationsOpenUrl, options);
    const data = JSON.parse(response.getContentText());
    const channelId = data.channel.id;

    const chatPostMessageUrl = 'https://slack.com/api/chat.postMessage';
    const chatPostMessagePayload = {
      channel: channelId,
      text: message
    };
    const chatPostMessageOptions = {
      ...options,
      payload: JSON.stringify(chatPostMessagePayload)
    };

    UrlFetchApp.fetch(chatPostMessageUrl, chatPostMessageOptions);
};

/**
 * app home更新
 */
const updateHome = (userId) => {
  const url = 'https://slack.com/api/views.publish';
  const [row] = getActiveUserIds().filter((id) => id === userId);
  const [title, link, ...others] = HOME_TAB.blocks;
  HOME_TAB.blocks = [
    title,
    link,
    { 'type': 'divider' },
    {
      'type': 'header',
      'text': {
        'type': 'plain_text',
        'text': `参加ステータス`
      }
    },
    { 'type': 'divider' },
    {
      'type': 'section',
      'text': {
        'type': 'mrkdwn',
        'text': `${row ? '参加中' : '未参加' }`
      }
    },
    ...others
  ];

  const options = {
    'method': 'post',
    'contentType': 'application/json; charset=UTF-8',
    'headers': {
      'Authorization': `Bearer ${SLACK_BOT_TOKEN}`
    },
    'payload': JSON.stringify({
      'user_id': userId,
      'view': HOME_TAB
    })
  };

  try {
    UrlFetchApp.fetch(url, options);
  } catch (err) {
    logToSheet(err.toString());
  }
};

/**
 * githubからPRの取得.
 */
const getPullRequests = () => {
  const url = `https://api.github.com/repos/${OWNER}/${REPOSITORY_NAME}/pulls`;

  const options = {
    'method': 'get',
    'headers': {
      'Authorization': `token ${GITHUB_TOKEN}`
    }
  };

  const response = UrlFetchApp.fetch(url, options);
  const pullRequests = JSON.parse(response.getContentText());

  return pullRequests;
};

/**
 * アクティブなメンバーへの通知.
 */
const slackActiveUserNotify = (message) => {
  const users = getActiveUserIds();
  users.forEach((user) => postMessage(user, message));
};


/**
 * ユーザーIDからprofileの取得を行う.
 */
const getProfile = (id = 'UTF7CA11B') => {
  const url = `https://slack.com/api/users.profile.get?include_labels=true&user=${id}`;
  const options = {
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + SLACK_BOT_TOKEN
    },
    muteHttpExceptions: true
  };

  const res = UrlFetchApp.fetch(url, options);
  const { profile } = JSON.parse(res.getContentText());
  const { value } = profile.fields[EMPLOYEE_FILED_ID];

  return value;
};

/**
 * 問題の追加.
 */
const addAssignment = (id, title) => {
  const app = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = app.getSheetByName(ASSIGNMENT_SHEET);
  sheet.appendRow([id, title]);
};

/**
 * 最終出題の情報の取得.
 */
const getLastAssignment = () => {
  const app = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = app.getSheetByName(ASSIGNMENT_SHEET);

  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(lastRow, 1, 1, lastColumn);

  return range.getValues()[0];
};

/**
 * 参加中のユーザー情報の参照.
 */
const getActiveUserIds = () => {
  const app = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = app.getSheetByName(MEMBER_SHEET);

  const range = sheet.getDataRange();
  const values = range.getValues();
  return values.filter(([, status]) => status === 'active').map(([id]) => id)
};


/**
 * gasのエラーをスプレットシートに出力.
 */
const logToSheet = (message, err = false) => {
  if (!SPREADSHEET_ID) {
    return;
  }

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(ERROR_LOG_SHEET);

  sheet.appendRow([new Date(), err ? 'err:' + message : message]);
};