/* eslint consistent-return:0 */

const express = require('express');
const { resolve } = require('path');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');
const http = require('http');
const https = require('https');
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const fs = require('fs');

var credentials = {
    key: fs.readFileSync(__dirname + '/../cert/server.key'),
    cert: fs.readFileSync(__dirname + '/../cert/server.crt')
  };

  http.createServer(app).listen(port, host, (err) => {
    if (err) {
      return logger.error(err.message);
    }
    logger.appStarted(port, prettyHost);
  });
  https.createServer(credentials, app).listen(443, host, (err) => {
    if (err) {
      return logger.error(err.message);
    }
    logger.appStarted(port, prettyHost);
  });

// Start your app.
// app.listen(port, host, (err) => {
//   if (err) {
//     return logger.error(err.message);
//   }
//   logger.appStarted(port, prettyHost);
// });
