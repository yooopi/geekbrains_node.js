function dateValidator({
  hour = new Date().getHours(),
  day = new Date().getDate(),
  month = new Date().getMonth() + 1,
  year = new Date().getYear(),
}) {
  try {
    for (item of Object.values(arguments[0])) {
      if (typeof item !== "number")
        throw Error("checkData function argument properties must be a number!");
    }

    // create the date object with the values sent in
    const date = new Date(year, month - 1, day, hour, 0, 0, 0);

    // get the hour, day, month, and year from the date we just created
    const hr = date.getHours();
    const dy = date.getDate();
    const mon = date.getMonth() + 1;
    const yr = date.getYear() + 1900;

    // if they match then the date is valid
    if (hour == hr && month == mon && year == yr && day == dy) return true;
    else return false;
  } catch (err) {
    throw err;
  }
};

// Parsing date from template 'hh-dd-mm-yyyy'
module.exports = getDateFromString = (arg) => {
  const timerRegExp = /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/g;
  if (!arg.match(timerRegExp))
    throw Error("Wrong date format! Please, follow the template 'hh-dd-mm-yyyy'");
  const splittedArg = arg.split("-");

  const parsedDateObj = {
    hour: parseInt(splittedArg[0]),
    day: parseInt(splittedArg[1]),
    month: parseInt(splittedArg[2]) - 1,
    year: parseInt(splittedArg[3]),
  };

  if (dateValidator(parsedDateObj)) {
      const parsedDate = new Date(parsedDateObj.year, parsedDateObj.month, parsedDateObj.day, parsedDateObj.hour);
      return parsedDate;
  } else {
      throw Error("Invalid date!")
  }
};