document.addEventListener("DOMContentLoaded", () => {
const clockButton = document.querySelector(".clock-button");
const timeCurrent = clockButton.querySelector(".clock-button__time-current");
let start = 0;
let savedTime = 0;

clockButton.addEventListener("click", () => {
    if (!clockButton.classList.contains(".started")) {
        clockButton.setAttribute("data-time-start", Date.now());   // Store where the timer have started
        clockButton.classList.toggle(".started");
    }
    clockButton.classList.toggle(".clicked");
    start = Date.now() - start;    
    if (!clockButton.classList.contains(".clicked")) { clockButton.setAttribute("data-time-saved", start); }
})


// clockButton.addEventListener("click", setInterval);
let hours = '';
let minutes = '';
let seconds = '';
let milliSeconds = '';

function updateTimer() {
    if (clockButton.classList.contains(".clicked")) {
        timeCurrent.textContent = `${minutes}:${seconds}.${milliSeconds}`;
    }    
}

setInterval(() => {
    delta = Date.now() - start + savedTime;
    hours = Math.floor(delta / 3600000).toString().padStart(2, "0");
    minutes = Math.floor((delta % 3600000) / 60000).toString().padStart(2, "0");
    seconds = Math.floor((delta % 60000) / 1000).toString().padStart(2, "0");
    milliSeconds = Math.floor((delta % 1000) / 10).toString().slice(0 , 1);
    
})

setInterval(updateTimer, 1);

})