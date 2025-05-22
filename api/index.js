const app = require('../src/index'); // Import Express app
const serverless = require('serverless-http');
const { connect } = require('../src/config/db/index');

connect();

module.exports = serverless(app, {
  timeout: 10, // tối đa 10 giây cho Vercel (không tăng được)
});
