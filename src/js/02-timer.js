import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtnEl = document.querySelector('button[data-start]');
startBtnEl.disabled = true;

const date = new Date();
const currentDate = date.getTime();
let usersDate = null;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentDate) {
      alert('Please choose a date in the future');
      startBtnEl.disabled = true;
    } else {
      startBtnEl.disabled = false;
    }
    usersDate = selectedDates[0];
    startBtnEl.addEventListener(
      'click',
      () => {
        timer.start();
      },
      { once: true }
    );
  },
});

const timer = {
  start() {
    const startTime = usersDate;
    startBtnEl.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      //   console.log(deltaTime);
      if (deltaTime < 1000) {
        this.stop();
      }
      const time = convertMs(deltaTime);

      update(time);
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },
};

function update({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').textContent = `${days}`;
  document.querySelector('span[data-hours]').textContent = `${hours}`;
  document.querySelector('span[data-minutes]').textContent = `${minutes}`;
  document.querySelector('span[data-seconds]').textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
