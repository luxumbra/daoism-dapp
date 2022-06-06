// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

const getPackageName = () => packageJson.name;

const config = {
  entries: [
    {
      filePath: './src/index.ts',
      outFile: `./dist/${getPackageName()}.d.ts`,
      noCheck: false,
    },
  ],
};

module.exports = config;
