import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
  stateInputs: document.querySelectorAll('input[name="state"]'),
};

refs.form.addEventListener('submit', event => {
    event.preventDefault(); 
  
    const delay = Number(refs.delayInput.value); 
    const selectedState = Array.from(refs.stateInputs).find(input => input.checked)?.value;
 
    createPromise(delay, selectedState)
      .then(delay => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            messageColor: 'white',
            messageSize: '20',
            position: "topCenter",
            backgroundColor: 'green',
            icon: false,
         });
      })
      .catch(delay => {
        iziToast.error({ 
            message: `❌ Rejected promise in ${delay}ms`, 
            messageColor: 'white',
            messageSize: '20',
            position: "topCenter",
            backgroundColor: 'light red',
            icon: false,
         });
      });
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }