import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const startButton = document.querySelector('[data-start]');
startButton.disabled = true;
const dateTimePicker = document.querySelector('#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        title: 'Please choose a date in the future',
        position: 'topCenter',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  dateTimePicker.disabled = true;
  updateTimer();
});

function updateTimer() {
  const timerInterval = setInterval(() => {
    const now = new Date();
    const timeUntilSelectedDate = userSelectedDate - now;
    if (timeUntilSelectedDate <= 0) {
      clearInterval(timerInterval);
      startButton.disabled = false;
      dateTimePicker.disabled = false;
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }
    const time = convertMs(timeUntilSelectedDate);
    updateTimerDisplay(time);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(time) {
  document.querySelector('[data-days]').textContent = formatTime(time.days);
  document.querySelector('[data-hours]').textContent = formatTime(time.hours);
  document.querySelector('[data-minutes]').textContent = formatTime(
    time.minutes
  );
  document.querySelector('[data-seconds]').textContent = formatTime(
    time.seconds
  );
}

function formatTime(time) {
  return String(time).padStart(2, '0');
}
