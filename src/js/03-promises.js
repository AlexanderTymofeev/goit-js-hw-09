const form = document.querySelector('.form');
const createPromise = function(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay });
      }
    }, delay)
});
 promise
 .then(({ position, delay }) => {
  console.log(`Fulfilled promise ${position} in ${delay}ms`);
 })
 .catch(({ position, delay }) => {
   console.log(`Rejected promise ${position} in ${delay}ms`);
 });
};
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;
  let currentDelay = Number(delay.value);
  const currentStep = Number(step.value);
  const currentAmount = Number(amount.value);
  for (let position = 1; position <= currentAmount; position++) {
  createPromise(position, currentDelay);
  currentDelay += currentStep;
  }
})

