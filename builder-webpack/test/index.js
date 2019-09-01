const path = require('path');

process.chdir(path.join(__dirname, 'smoke', 'template'));
describe('ut builder-webpack', () => {
  require('./unit/webpac-base-test');
});
