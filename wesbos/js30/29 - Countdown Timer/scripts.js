let countDown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countDown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countDown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0) {
            clearInterval(countDown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const hours = Math.trunc(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.trunc(seconds / 60);
    seconds %= 60;
    const display = `
        ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}
    `;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const seconds = end.getSeconds();
    endTime.textContent = `Be Back At  ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

buttons.forEach(button => button.addEventListener('click', startTimer));

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});