import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const getParentFolder = () => {
  let __dirname = dirname(fileURLToPath(import.meta.url)).split('/');
  __dirname.pop();
  __dirname.pop();
  __dirname = __dirname.join('/');

  return __dirname;
};
