/**
 * Example router
 * @author Simon Tannai <tannai.simon@gmail.com>
 * @todo: Nothing
 */

'use strict';

const express     = require('express');
const router      = express.Router();
const bodyParser  = require('body-parser');

const exampleController = require(__dirname+'/exampleController.js');
const logger            = require(__dirname+'/../logger/logger.js');

/**
 * Example route
 * URI: POST /
 */
router.post('/', (req, res) => {
  if(!req.body.query) {
    logger.error('No query');
    return res.status(403).send();
  }
  else {
    let someVar = exampleController.someFunction();

    res.status(200).send(someVar);
  }
});

/**
 * Export router
 * @type {Object}
 */
module.exports = router;
