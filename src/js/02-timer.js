import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const startBtn = document.querySelector('[data-start]');
const timeDays = document.querySelector('[data-days]');
const timeHrs = document.querySelector('[data-hours]');
const timeMins = document.querySelector('[data-minutes]');
const timeSecs = document.querySelector('[data-seconds]');

function convertMs(ms) {
    // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
    // Remaining days
      const days = Math.floor(ms / day);
    // Remaining hours
      const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
      return { days, hours, minutes, seconds };
    }
    console.log(convertMs(2000));// {days: 0, hours: 0, minutes: 0, seconds: 2}
    console.log(convertMs(140000));// {days: 0, hours: 0, minutes: 2, seconds: 20}
    console.log(convertMs(24140000));// {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const today = new Date();
        if(selectedDate < today) {
            Notiflix.Notify.failure('Please choose a date from the future!');
            startBtn.setAttribute('disabled', true);
            startBtn.style.cursor = 'default';
            } else { 
                startBtn.removeAttribute('disabled');
                   };
        startBtn.addEventListener('click', (e) => {
            startBtn.setAttribute('disabled', true);
            const timeCounter = setInterval(() => {
                const currDate = new Date();
                const timeToExpire = selectedDate - currDate;
                if(timeToExpire <= 0) {
                    return clearInterval(timeToExpire);
                };
                const convert = convertMs(timeToExpire);
                timeDays.textContent = addLeadingZero(convert.days);
                timeHrs.textContent = addLeadingZero(convert.hours);
                timeMins.textContent = addLeadingZero(convert.minutes);
                timeSecs.textContent = addLeadingZero(convert.seconds);
            }, 1000);
        });
  },
});
 function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
 };
