#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("readline");

const input = readline.createInterface(process.stdin);

yargs(hideBin(process.argv))
  .option("fn", {
    alias: "filename",
    demandOption: true,
    describe: "Название файла для записи лога игры",
    type: "string",
  })
  .fail((msg, err, yargs) => {
    if (err) throw err;
    console.error("Ошибка!");
    console.error(msg);
    console.error(yargs.help());
    process.exit(-1);
  })
  .help().argv;

const generateRandomNum = () => Number(Math.random() < 0.5) + 1;

process.stdout.write(`Введите ответ 1 (орел) или 2 (решка)\n`);
input.on("line", (val) => {
  const randomNum = +generateRandomNum();
  const answer = Number(val);

  if (!answer || ![1, 2].includes(answer)) {
    console.error("Ошибка! Введено некорректное значение!");
    process.exit(-1);
  }

  const result = randomNum === answer ? "Угадано верно" : "Не угадано";
  const output = `Число, загаданное компьютером: ${randomNum}. Число, введенное пользователем: ${answer}. ${result}.`;

  console.log(output);
});
