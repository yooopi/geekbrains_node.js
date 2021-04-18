const minimist = require("minimist");
const chalk = require("chalk");

const arguments = minimist(process.argv.slice(2), {
  string: ["number"],
  alias: {
    number: "n",
  },
});

if (!parseInt(arguments.number)) throw new Error("argument must be a number");


// Using Sieve of Eratosthenes to find prime numbers
const getPrimeNumbers = (num) => {
  const primeNumbers = [];
  const trash = []; // trash[not prime number] === true, ex. trash[4] = true, trash[7] = undefined

  for (let i = 2; i <= num; i++) {
    if (!trash[i]) {
      primeNumbers.push(i);

      for (let j = i * i; j <= num; j += i) {
        trash[j] = true;
      }
    }
  }
  return primeNumbers;
};

const primes = getPrimeNumbers(arguments.number);

if (primes.length === 0) {
  console.error(
    chalk.red(`Prime numbers not found in range ${arguments.number}!`)
  );
}

const colorfulLogger = (numArr) => {
  const colors = [chalk.green, chalk.yellow, chalk.blue];
  let res = "";

  for (let i = 0, j = 0; i < numArr.length; i++, j++) {
    if (j > colors.length - 1) j = 0;

    res += `${colors[j](numArr[i])}, `;
  }

  console.log(res);
};

colorfulLogger(primes);