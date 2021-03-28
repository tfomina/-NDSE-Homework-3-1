const path = require("path");
const fs = require("fs");

const FOLDER_NAME = "log";

const validateFilename = (filename) => {
  let error = "";

  if (!filename) {
    error = "Имя файла не может быть пустым. Введите другое имя файла.";
  }

  const filePath = getFilePath(filename);
  if (fs.existsSync(filePath)) {
    error = `Файл с именем ${filePath} уже существует. Введите другое имя файла.`;
  }

  return error;
};

const getFilePath = (filename) =>
  path.join(__dirname, FOLDER_NAME, `${filename}.txt`);

const getDirPath = () => path.join(__dirname, FOLDER_NAME);

const handleError = (error) => {
  console.error(error);
  process.exit(-1);
};

const generateRandomNumFromArr = (arr) =>
  arr[Math.floor(Math.random() * arr.length)].toString();

module.exports = {
  validateFilename,
  getFilePath,
  handleError,
  generateRandomNumFromArr,
  getDirPath,
};
