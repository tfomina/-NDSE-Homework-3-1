#!/usr/bin/env node

const fs = require("fs");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("readline");
const {
  getFilePath,
  validateFilename,
  handleError,
  generateRandomNumFromArr,
  getDirPath,
} = require("./helpers");

const input = readline.createInterface(process.stdin);

const POSSIBLE_ANSWERS = ["1", "2"];

const options = yargs(hideBin(process.argv))
  .option("fn", {
    alias: "filename",
    demandOption: true,
    describe: "Название файла для записи лога игры",
    type: "string",
  })
  .check((argv) => {
    const error = validateFilename(argv.filename);

    if (!!error) {
      handleError(error);
    } else {
      return true;
    }
  })
  .fail((msg, err, yargs) => {
    if (err) throw err;
    console.error("Ошибка!");
    console.error(msg);
    console.error(yargs.help());
    process.exit(-1);
  })
  .strict()
  .help().argv;

process.stdout.write(
  `Введите ответ ${POSSIBLE_ANSWERS[0]} (орёл) или ${POSSIBLE_ANSWERS[1]} (решка)\n`
);
input.on("line", (answer) => {
  const output = playGame(answer);

  console.log(output);

  writeLog(options.filename, output);
});

const playGame = (answer) => {
  const randomNum = generateRandomNumFromArr(POSSIBLE_ANSWERS);

  if (!answer || !POSSIBLE_ANSWERS.includes(answer)) {
    handleError("Ошибка! Введено некорректное значение!");
  }

  const result = randomNum === answer ? "Угадано верно" : "Не угадано";
  const output = `Число, загаданное компьютером: ${randomNum}. Число, введенное пользователем: ${answer}. ${result}.\n`;

  return output;
};

const writeLog = (filename, output) => {
  const dirPath = getDirPath();
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, (err) => {
      if (err) handleError("Ошибка создания директории!");
    });
  }

  const filePath = getFilePath(filename);

  const date = new Date().toLocaleString("ru-RU");
  const logOutput = `${date}. ${output}`;

  if (fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, logOutput, (err) => {
      if (err) {
        handleError("Ошибка логирования!");
      }
    });
  } else {
    fs.writeFileSync(
      filePath,
      `Лог от ${new Date().toLocaleDateString("ru-RU")}.\n${logOutput}`,
      (err) => {
        if (err) {
          handleError("Ошибка логирования!");
        }
      }
    );
  }
};
