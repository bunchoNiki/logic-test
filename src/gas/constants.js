const SLACK_BOT_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_BOT_TOKEN');
const EMPLOYEE_FILED_ID = 'Xf03UU0K1NAK';

const OWNER = 'bunchoNiki';
const REPOSITORY_NAME = 'logic-test';
const GITHUB_TOKEN = PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN');

const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
const ERROR_LOG_SHEET = 'エラーログ';
const MEMBER_SHEET = '参加者';
const ASSIGNMENT_SHEET = '問題';
const USER_ID_INDEX = 0;


const HOME_TAB = {
  "type": "home",
  "blocks": [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "repository"
      }
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text":"https://github.com/bunchoNiki/logic-test"
      }
    },
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "出題日"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "問題は毎月1日と15日にこのappより送信されます。"
      }
    },
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "運用ルール"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "1. 出題する問題のブランチから新規ブランチを作成して問題を解くこと。\n2. ブランチは親ブランチ名-社員番号で作成すること。\n   ※ブランチ名がその出題された問題を実行するためのnpm scriptと紐づいているため実行ができなくなります。\n3. ファイルの実行は以下のコマンドを実行することで起動します。\n   ```\n$ > npm run node:run\n\```\nこれが起動できない場合ブランチの命名規則が壊れています。\n4. 出題する問題はロジックの製造、修正、リファクタリングと製造だけに限りません。\n5. npmモジュールを新規で追加することは禁止。\n6. node(TypeScript)を使って書くこと。\n   ※型定義の有無は任せます。\n7. ESLintの設定に従うこと。\n8. ロジックの正しさについてはJestを使って採点します。CIでJestが動くため、動いていない場合はローカルで修正すること。\n9. 資材内のlogic/内に問題が配置されています。\n  メソッドの指定があるので、そちらに実装してください。それ以外の箇所に書くとJestが破綻するためNGです。"
      }
    },
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "pre-commitについて"
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "ある程度のソースの品質を保証するため最低限のeslintの設定を入れてコミット時にpre-commitが走るようになっています。\nスペルチェックとeslintのwarnが出ている場合はコミットができないので注意してください。"
      }
    }
  ]
};

const NON_INDEX = -1;

const MESSAGES = {
  'active': '参加ありがとうございます。\nホームタブを確認して運用ルールを確認できます。\n\n自身のタイミングで気軽に問題を解いてみてもらえると幸いです。',
  'inactive': 'ご協力ありがとうございました。\nマタの参加をお待ちしています。'
}