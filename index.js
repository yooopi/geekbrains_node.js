const fs = require("fs");
const readline = require("readline");

const ipArr = ["89.123.1.41", "34.48.240.111"];

async function matchesLineByLine(arr, fileName) {
    const readStream = fs.createReadStream(fileName, { flags: "r" });
    const writeStreams = [];
    arr.forEach(item => {
        writeStreams.push(fs.createWriteStream(`${item}_requests.log`, {flags: 'w'}))
    })

// To read file line by line
    const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    arr.forEach((item) => {
      const regExp = new RegExp(item, "g");
      if (line.match(regExp)) writeStreams[arr.indexOf(item)].write(`${line}\n`)
    });
  }
}

matchesLineByLine(ipArr, 'access.log');
