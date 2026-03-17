document.addEventListener("DOMContentLoaded", () => {
const clockButtons = document.querySelectorAll(".clock-button");

clockButtons.forEach((clockButton) => {
    clockButton.addEventListener("click", () => {
        let start = 0;
        if (!clockButton.classList.contains(".started")) {
            clockButton.setAttribute("data-time-start", 0);   // Initialise the value
            clockButton.classList.toggle(".started");
        }
        clockButton.classList.toggle(".clicked");
        start = Date.now() - parseInt(clockButton.dataset.timeStart);
        clockButton.setAttribute("data-time-start", start);
    })
})


function updateTimer(clockButton, hours, minutes, seconds, milliSeconds) {
    const timeCurrent = clockButton.querySelector(".clock-button__time-current");
    if (clockButton.classList.contains(".clicked")) {
        timeCurrent.textContent = `${hours}:${minutes}:${seconds}.${milliSeconds}`;
        clockButton.setAttribute("data-time-current", delta);
    }    
}

setInterval(() => {
    clockButtons.forEach((clockButton) => {
        let clockStart = parseInt(clockButton.dataset.timeStart ? clockButton.dataset.timeStart : 0);

        delta = (Date.now() - clockStart)*60;
        let hours = Math.floor(delta / 3600000).toString().padStart(2, "0");
        let minutes = Math.floor((delta % 3600000) / 60000).toString().padStart(2, "0");
        let seconds = Math.floor((delta % 60000) / 1000).toString().padStart(2, "0");
        let milliSeconds = Math.floor((delta % 1000) / 10).toString().slice(0 , 1);

        updateTimer(clockButton, hours, minutes, seconds, milliSeconds);
    })   
})

})