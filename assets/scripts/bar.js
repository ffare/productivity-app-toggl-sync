// For the bar code
document.addEventListener("DOMContentLoaded", () => {
    bars = document.querySelectorAll(".bar");
    
    setInterval(() => {
        bars.forEach(updateBarWidth);
    }, 1000)
})

function updateBarWidth(bar) {
    bar.style.width = getNewWidth(bar)+"%";
}

function getTotalHours(clockButton) {
    return clockButton.dataset.timeTotal;
}

function getNewWidth(bar) {
    let timeTotal = convertTime(bar.parentElement.dataset.timeTotal) || 1;
    let timeCurrent = bar.parentElement.dataset.timeCurrent || 0;

    return (timeTotal - timeCurrent)*100/timeTotal;
}

function convertTime(hours) {
    return hours * 60 * 60 * 1000;  // Convert to timestamp
}