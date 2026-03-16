document.addEventListener("DOMContentLoaded", () => {
const clockButton = document.querySelector(".clock-button");
const timeCurrent = clockButton.querySelector(".clock-button__time-current");
const start = Date.now();

clockButton.addEventListener("click", () => {
    clockButton.classList.toggle(".clicked");
    clockButton.setAttribute("data-value", Date.now());
})

// clockButton.addEventListener("click", setInterval);
let hours = '';
let minutes = '';
let seconds = '';
let milliSeconds = '';

function updateTimer() {
    timeCurrent.textContent = `${minutes}:${seconds}.${milliSeconds}`;
}

setInterval(() => {
    delta = Date.now() - start;
    hours = Math.floor(delta / 3600000).toString().padStart(2, "0");
    minutes = Math.floor((delta % 3600000) / 60000).toString().padStart(2, "0");
    seconds = Math.floor((delta % 60000) / 1000).toString().padStart(2, "0");
    milliSeconds = Math.floor((delta % 1000) / 10).toString().slice(0 , 1);
    
})

setInterval(updateTimer, 1);

})