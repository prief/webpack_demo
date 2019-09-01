
const assert = require('assert');

describe('webpack-base-test.js', () => {
  const baseConfig = require('../../lib/webpack.base');
  it('test entry to be object', () => {
    assert.equal(baseConfig.entry.index, 'Q:/vscode/webpack_demo/builder-webpack/test/smoke/template/src/index/index.js');
  });
});
