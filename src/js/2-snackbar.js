import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = form.querySelector('input[type="number"]');
const fulfilledRadio = form.querySelector('input[value="fulfilled"]');
const rejectedRadio = form.querySelector('input[value="rejected"]');

let state = '';
let delay = null;

delayInput.addEventListener('input', () => {
  const delayValue = delayInput.value.trim();
  delay = parseInt(delayValue);
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (delay < 0) {
    iziToast.error({
      title: 'Error',
      message: 'The value cannot be negative',
      position: 'topCenter',
    });
    return;
  }

  makePromise({ value: state, delay: delay })
    .then(value =>
      iziToast.show({
        message: value,
        position: 'topCenter',
        color: '#269926',
        backgroundColor: '#269926',
        messageColor: 'white',
      })
    )
    .catch(error =>
      iziToast.show({
        message: error,
        position: 'topCenter',
        color: '#BF3030',
        backgroundColor: '#BF3030',
        messageColor: 'white',
      })
    );
  form.reset();
});

fulfilledRadio.addEventListener('change', event => {
  state = event.target.value;
});

rejectedRadio.addEventListener('change', event => {
  state = event.target.value;
});

const makePromise = ({ value, delay }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else value === 'rejected';
      {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};
