import { execSync } from 'child_process';
import path from 'path';

(async () => {
    const branchName = execSync('git branch --show-current').toString().trim();

    const folderName = branchName.split('-')[0];

    if (!folderName) {
      throw new Error('フォルダ名の取得に失敗しました。');
    }

    const targetPath = path.resolve(__dirname, '..', 'src', 'logic', folderName, 'execute.ts');
    await import(targetPath);

})();