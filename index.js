const EventEmmiter = require("events");
const emmiter = new EventEmmiter();
const dateParser = require("./dateParser");
const yargs = require("yargs");

const args = yargs.usage("Usage: -t or --timer").option("t", {
  alias: "timers",
  describe: "Array of timers to set",
  type: "array",
  demandOption: true,
}).argv;

const datePrettier = new Intl.DateTimeFormat("ru", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

const validatedTimers = [];

// Parsing and validating dates from arguments
args.timers.forEach((item) => {
    if (new Date() > dateParser(item)) {
      console.warn(
        `${datePrettier.format(
          dateParser(item)
        )}\nDate can't be less then current. Timer willn't be set!`
      );
    } else {
  validatedTimers.push(dateParser(item));
    }
});

const getCountdown = (finishDate) => {
  const difference = finishDate - new Date();
  const hours = difference / 36e5;
  const minutes = (hours % 1) * 60;
  const seconds = (minutes % 1) * 60;
  const twoDigitForamatter = (number) =>
    number > 0 && number < 10 ? `0${number}` : number;

  return `${twoDigitForamatter(Math.floor(hours))}:${twoDigitForamatter(
    Math.abs(Math.floor(minutes))
  )}:${twoDigitForamatter(Math.abs(Math.floor(seconds)))}`;
};

const renderTimers = (arr) => {
  console.clear();
  validatedTimers.forEach((date) => {
    if (new Date() > date) {
      emmiter.emit("timerDone", date);
    } else {
      console.log(`${getCountdown(date)} until ${datePrettier.format(date)}`);
    }
  });
};

emmiter.on("timerDone", (date) =>
  console.log(`Timer done: ${datePrettier.format(date)}`)
);

setTimeout(() => {
    setInterval(() => {
        renderTimers(validatedTimers);
      }, 1000);
}, 5000);