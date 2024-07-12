let timer;
let isRunning = false;
let elapsedTime = 0;
let startTime = 0;
let lapTimes = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const lapButton = document.getElementById('lap');
const resetButton = document.getElementById('reset');
const lapsList = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        lapButton.disabled = true;
        resetButton.disabled = false;
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Stop';
        lapButton.disabled = false;
        resetButton.disabled = true;
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00.000';
    startStopButton.textContent = 'Start';
    lapButton.disabled = true;
    resetButton.disabled = true;
    lapTimes = [];
    lapsList.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        lapTimes.push(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapTimes.length} <span>${formatTime(elapsedTime)}</span>`;
        lapsList.appendChild(lapItem);
    }
});
