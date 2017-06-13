/* Author: Lily Wu
   Date: June 12, 2017 */

const $configButton = document.querySelector('#configButton');
const $taskInput = document.querySelector('#taskInput');
const $startButton = document.querySelector('#startButton');
const $status = document.querySelector('#status');
const $timeDisplay = document.querySelector('#timeDisplay');
const $tasksCompleted = document.querySelector('#tasksCompleted');
var numTasks = 0;
var taskArray = [];
var timeoutID;
var currentColor;
var workTime = 25;
var breakTime = 5;

function startTask() {
  $startButton.style.visibility = 'hidden';
  currentColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
  numTasks++;
  var str = taskInput.value;
  if (!str.replace(/\s/g, '').length)
    str = 'task #' + numTasks;
  $status.innerHTML = 'Currently working on <span style="color:' + currentColor + '">' + str + '<//span>.';

  taskArray.push(str);
  startWork(60 * workTime, $timeDisplay);
}

function startWork(duration, display) {
  var timer = duration, minutes, seconds;
  var refreshId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      startBreak(display);
      clearInterval(refreshId);
    }
  }, 1000);
}

function startBreak(display) {
  var timer, minutes, seconds;
  if ($tasksCompleted.innerHTML === '')
      $tasksCompleted.innerHTML = '<span style="font-size: 25px">Tasks Completed:</span><br>';
  $status.innerHTML = 'Take a break!';
  if (taskArray.length === 1)
    $tasksCompleted.innerHTML += '<span style="color:' + currentColor + '">' + taskArray[taskArray.length - 1] + '<//span>';
  else
    $tasksCompleted.innerHTML += ', <span style="color:' + currentColor + '">' + taskArray[taskArray.length - 1] + '<//span>';

  if (taskArray.length < 3) timer = 60 * breakTime;
  else timer = 60 * 2 * breakTime; // double break once 3 tasks are completed

  var refreshId = setInterval(function() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      $startButton.style.visibility = 'visible';
      $status.innerHTML = 'Break\'s over!';
      clearInterval(refreshId);
    }
  }, 1000)
}

function rainbow() {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  var r, g, b;
  var h = 12 / 30; // 30 random hues with step of 12 degrees.
  var i = ~~(h * 6);
  var f = h * 6 - i;
  var q = 1 - f;
  switch(i % 6){
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
  }
  var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
  return (c);
}

function changeTimes() {
  workTime = Number(window.prompt('Enter new work time:', ''));
  while (!Number.isInteger(workTime) || workTime <= 0)
    workTime = Number(window.prompt('Invalid work time. Please enter an integer greater than 0.', ''));
  breakTime = Number(window.prompt('Enter new break time:', ''));
  while (!Number.isInteger(breakTime) || breakTime <= 0)
    breakTime = Number(window.prompt('Invalid break time. Please enter an integer greater than 0.', ''));
}

$taskInput.addEventListener('keyup', function(e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) startTask();
})
$startButton.addEventListener('click', startTask);
$configButton.addEventListener('click', changeTimes);
