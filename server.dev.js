/**
 * Node.js boilerplate
 * @author: Simon Nowis <tannai.simon@gmail.com>
 * @license: MIT
 */

'use strict';

const express     = require('express');
const helmet      = require('helmet');
const bodyParser  = require('body-parser');

const log4js      = require('log4js');

const morgan      = require('morgan');

const fs          = require('fs');
const path        = require('path');

const app         = express();
const port        = 8080;

// Use helmet for security
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/webapp'));

/* =================================================================== *\
 *  GLOBAL LOG
\* =================================================================== */
let logger;

if(process.env.NODE_ENV === 'production') {
  log4js.configure(__dirname+'/config/log4js.json');
  logger = log4js.getLogger('log');
}
else {
  logger = log4js.getLogger();
}
/* =================================================================== *\
 *  END OF GLOBAL LOG
\* =================================================================== */

/* =================================================================== *\
 *  LOG HTTP
\* =================================================================== */
if(process.env.NODE_ENV === 'production') {
  const fileStreamRotator = require('file-stream-rotator');

  let logDirectory = path.join(__dirname, 'log');

  // ensure log directory exists
  if(!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory);
  }

  // create a rotating write stream
  let accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  });

  // setup the logger
  app.use(morgan('combined', {stream: accessLogStream}));
}
else {
  app.use(morgan('combined'));
}
/* =================================================================== *\
 *  END OF LOG HTTP
\* =================================================================== */

app.get('/', (req, res) => {
  res.status(200).send('May the force be with you.');
});

/* =================================================================== *\
 *
 *  AMAZING CODE HERE
 *
\* =================================================================== */

app.listen(port, () => {
  logger.info('Server run on port', port, 'in', process.env.NODE_ENV, 'mode');
})
