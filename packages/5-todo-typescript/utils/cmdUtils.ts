export const isTestEnv = (): boolean => {
  process.argv.forEach((arg) => {
    if (arg === 'serve') {
      return true;
    }
  });

  return false;
};
