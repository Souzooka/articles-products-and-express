/*jshint esversion:6*/
const fs = require('fs');

const generateFileName = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${year}.${month}-${day}.log`;
};

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