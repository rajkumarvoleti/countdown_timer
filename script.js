const displayTimeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
var buttons = document.querySelectorAll(".timer__button");
const input = document.querySelector("[name = minutes]");
const inputForm = document.querySelector("[name = customForm]");
var flag = 0,
  timerId;

function timer(seconds) {
  flag++;
  displayTimeLeft.textContent = "00:00";
  endTime.textContent = "";
  const start = Date.now() / 1000;
  const end = start + seconds;
  displayEndTime(seconds, end);
  if (flag > 1) {
    clearInterval(timerId);
    flag = 1;
  }
  timerId = setInterval(() => setTimer(end), 1000);
}

function setTimer(end) {
  const timeLeft = Math.round(end - (Date.now() / 1000));
  displayTimeLeft.textContent = displayTime(timeLeft);
  if (timeLeft <= 0) return;
}

function displayEndTime(seconds) {
  var d = new Date();
  var hours = d.getHours() + Math.floor(seconds / 3600);
  var minutes = d.getMinutes() + Math.floor(seconds / 60);
  while(minutes >= 60){
    hours += 1;
    minutes -= 60;
  }
  minutes = formatTime(minutes);
  endTime.textContent = "be back at " + hours + ":" + minutes;
}

function displayTime(time) {
  const seconds = formatTime(time % 60);
  time -= seconds;
  const minutes = time / 60;
  return minutes + ":" + seconds;
}

function formatTime(time) {
  return time.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function handleClick(){
  const time = this.dataset.time;
  timer(parseInt(time));
}

displayTimeLeft.textContent = "00:00";
endTime.textContent = "";
buttons = [...buttons];
buttons.forEach(button => {
  button.addEventListener("click",handleClick)
});

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const time = parseInt(input.value);
  timer(time*60);
  input.value = null;
});