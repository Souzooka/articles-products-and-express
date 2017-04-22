/*jshint esversion:6*/
const fs = require('fs');

/** function generateFileName()
  * Parameters:
  *   void
  * Return values:
  *   A string representing a filename for a log file.
  *   └─Example: "2017.04.09.log"
  * Behavior:
  *   Gathers info from a date object and generates filename to return.
  */
const generateFileName = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}.${month}-${day}.log`;
};

/** function writeLogFile(req, res, next)
  * Parameters:
  *   Connection request object,
  *   Connection response object (unused in this context),
  *   Next function
  * Return values:
  *   void
  * Behavior:
  *   Writes a log to the the <root>/logs directory
  *   with a file name containing the date and extension .log.
  *   If this file already exists, this function appends to the log in the file.
  *   The log contains information about the request method, request URI, and the time.
  */
const writeLogFile = (req, res, next) => {
  const FOLDER = './logs/';
  const FILENAME = generateFileName();
  const CONTENT = `${req.method} ${req.url} ${new Date().toUTCString()}\n`;
  let fileFunction = fs.appendFile;

  fs.access(`${FOLDER}${FILENAME}`, fs.constants.F_OK, (err) => {
    if (err) {
      fileFunction = fs.writeFile;
    }
    fileFunction(`${FOLDER}${FILENAME}`, `${CONTENT}`, (err) => {
      if (err) {
        throw new Error(`Cannot write to ${FOLDER}${FILENAME}!`);
      }
      next();
    });
  });
};

module.exports = writeLogFile;