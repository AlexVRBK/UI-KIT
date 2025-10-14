
    let totalSeconds = 30 * 60; 
    
    const minutesDisplay = document.querySelector('.m-timer');
    const secondsDisplay = document.querySelector('.s-timer');
    const hoursDisplay = document.querySelector('.h-timer');

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    function startCountdown() {
        if (hoursDisplay) {
            hoursDisplay.textContent = '00';
        }

        const timerInterval = setInterval(() => {
            if (totalSeconds <= 0) {
                clearInterval(timerInterval);
                minutesDisplay.textContent = '00';
                secondsDisplay.textContent = '00';
                console.log('Отсчет завершен!');
                return;
            }

            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;

            if (minutesDisplay) {
                 minutesDisplay.textContent = formatTime(minutes);
            }
            if (secondsDisplay) {
                secondsDisplay.textContent = formatTime(seconds);
            }
           
            totalSeconds--;

        }, 1000); 
    }

    window.onload = startCountdown;