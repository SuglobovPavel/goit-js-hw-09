import Notiflix from 'notiflix';

const REFS = {
  form: document.querySelector("#form1"),
}

function createPromise(position, delay) {
  position = position + 1;
  const shouldResolve = Math.random() > 0.3;
  let promise = new Promise((resolve, reject)=>{
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({ position, delay});
      }
    }, delay);
  });

  return promise.then((obj)=>{
    console.log("успех");
    Notiflix.Notify.success(`✅ Fulfilled promise ${obj.position} in ${obj.delay}ms`)
  }).catch((obj)=>{
    console.log("неуспех");
    Notiflix.Notify.failure(`❌ Rejected promise ${obj.position} in ${obj.delay}ms`)
  });
}

REFS.form.addEventListener("submit", function(e){
  e.preventDefault();
  let delay = Number(e.currentTarget.elements.delay.value);
  let step = Number(e.currentTarget.elements.step.value);
  let amount = Number(e.currentTarget.elements.amount.value);

  for(let i = 0; i < amount; i=i+1){
    let delayMat = delay + (i * step);
    console.log(delayMat);
    createPromise(i, delayMat);
  }

});