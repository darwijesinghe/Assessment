// Let the document know when the mouse is being used
document.body.addEventListener("mousedown", function () {
  document.body.classList.add("used-mouse");
});

// Re-enable focus styling when Tab is pressed
document.body.addEventListener("keydown", function (event) {
  if (event.keyCode === 9) {
    document.body.classList.remove("used-mouse");
  }
});

const options = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const mon = "02";
const day = "0";
const year = "2023";
const date = `${year}-${mon}-${day}`;

const start = new Date(date); // 2023-01-07
const end = new Date("2023-02-11");

// validate date
if (start instanceof Date && !isNaN(start)) {
  console.log("true");
} else {
  console.log("false");
}

const dayOfweek = start.getDay();
if ((dayOfweek === 6) | (dayOfweek === 0)) {
  console.log("weekend");
} else {
  console.log("weekday");
}

let arr = [];

// get all dates between start and end
for (
  var dy = new Date(start);
  dy <= new Date(end);
  dy.setDate(dy.getDate() + 1)
) {
  arr.push(new Date(dy));
}

// filter weekends
var weekdays = arr.filter((value, index) => {
  return (arr[index].getDay() != 6) & (arr[index].getDay() != 0);
});

// filter from holidays
const holidays = [08, 18, 21, 22, 27, 28];

var workdays = weekdays.filter((value, index) => {
  return !holidays.includes(weekdays[index].getDate());
});

console.log(weekdays);
console.log(workdays);
console.log(workdays.length)
