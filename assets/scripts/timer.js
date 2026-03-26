document.addEventListener("DOMContentLoaded", () => {
const clockButtons = document.querySelectorAll(".clock-button");
const timerSpeed = 1;


clockButtons.forEach((clockButton) => {
    // Initialise total time
    const description = clockButton.getAttribute("id");
    const timeTotal = localStorage.getItem(description) || localStorage.getItem(`${description}Default`);
    clockButton.setAttribute("data-time-total", timeTotal);

    // Handle click events
    clockButton.addEventListener("click", () => {
        let start = 0;
        if (!clockButton.classList.contains("started")) {
            clockButton.setAttribute("data-time-start", 0);   // Initialise the value
            clockButton.classList.toggle("started");
        }

        // Toggle clock for Toggl        
        if (clockButton.classList.contains("clicked")) {
            stopToggleTimeEntry();
            const newTimeTotal = clockButton.dataset.timeTotal - clockButton.dataset.timeCurrent;
            localStorage.setItem(description, newTimeTotal);
            console.log(newTimeTotal);
            // console.log(`${description}:${clockButton.dataset.timeTotal}`);
        }
        else {            
            postToggl(description);
        }

        clockButton.classList.toggle("clicked");
        start = Date.now() - parseInt(clockButton.dataset.timeStart);

        // Update start
        clockButton.setAttribute("data-time-start", start);
    })
})

// For the reset functionality
const editOverlays = document.querySelectorAll(".clock-button__edit-overlay");
editOverlays.forEach((editOverlay) => {
    const resetButton = editOverlay.querySelector(".reset-button");

    resetButton.addEventListener("click", (e) => {
        // update Total Timer
        const timeCurrent = editOverlay.closest(".clock-button").dataset.timeCurrent;
        const timeTotal = editOverlay.closest(".clock-button").dataset.timeTotal;
        editOverlay.closest(".clock-button").setAttribute("data-time-total", timeTotal - timeCurrent);

        resetButton.closest(".clock-button").setAttribute("data-time-start", 0);
    })
})


function updateTimer(clockButton, hours, minutes, seconds, milliSeconds) {
    const timeCurrent = clockButton.querySelector(".clock-button__time-current");

    if (clockButton.classList.contains("clicked")) {
        timeCurrent.textContent = `${hours}:${minutes}:${seconds}`;
        clockButton.setAttribute("data-time-current", delta);
    }    
}

function updateTotalTimer(clockButton) {
    let timeTotalText = clockButton.querySelector(".clock-button__time-remaining");

    let timeTotal = clockButton.dataset.timeTotal;
    let currentTime = clockButton.dataset.timeCurrent || 0;
    let newDelta = timeTotal - currentTime;    
    
    let hours = Math.floor(newDelta / 3600000).toString().padStart(2, "0");
    let minutes = Math.floor((((newDelta) % 3600000) / 60000)).toString().padStart(2, "0"); 
    
    timeTotalText.textContent = `${hours}:${minutes}`;
}




setInterval(() => {
    clockButtons.forEach((clockButton) => {    
        let clockStart = parseInt(clockButton.dataset.timeStart ? clockButton.dataset.timeStart : 0);

        delta = (Date.now() - clockStart)*timerSpeed;
        let hours = Math.floor(delta / 3600000).toString().padStart(2, "0");
        let minutes = Math.floor((delta % 3600000) / 60000).toString().padStart(2, "0");
        let seconds = Math.floor((delta % 60000) / 1000).toString().padStart(2, "0");
        let milliSeconds = Math.floor((delta % 1000) / 10).toString().slice(0 , 1);

        updateTimer(clockButton, hours, minutes, seconds, milliSeconds);
        updateTotalTimer(clockButton);
    })   
})

})