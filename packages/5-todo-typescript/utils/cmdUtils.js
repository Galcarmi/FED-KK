const isTestEnv = () => {
  process.argv.forEach((arg) => {
    if (arg === 'serve') {
      return true;
    }
  });

  return false;
};

module.exports = { isTestEnv };
