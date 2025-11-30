
import { FileSystemResult, FileSystemTree } from "./constants";


/**
 * ファイルパスのリストを受け取り、ツリー構造とエラーリストを返す。
 *
 * @param paths ファイルパスの配列。
 * @returns 構築されたツリー構造と発生したエラーのリストを含むオブジェクト。
 */
export const main = (paths: string[]): FileSystemResult => {
  const tree: FileSystemTree = {};
  const errors: string[] = [];

  for (const path of paths) {
    const parts = path.split('/').filter((p) => p !== '');
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = part.includes('.');

      if (isFile) {
        const existingDir = current[part];
        if (existingDir && typeof existingDir !== 'undefined') {
          errors.push(`Invalid path: ${path}`);
          break;
        }

        if (!current.files) {
          current.files = [];
        }

        if (!current.files.includes(part)) {
          current.files.push(part);
        }
      } else {
        if (current.files && current.files.includes(part)) {
          errors.push(`Invalid path: ${path}`);
          break;
        }

        if (!current[part]) {
          current[part] = {};
        }
        current = current[part] as FileSystemTree;
      }
    }
  }

  return { tree, errors };
};
