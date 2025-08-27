import { Mode } from './constants';

export const main = (word: string, key: string, mode: Mode) => {
  return 'Rijvs Uyvjn!'.replace('',word).replace('', key).replace('', mode);
};

main('Hello World!', 'key', 'encrypt');