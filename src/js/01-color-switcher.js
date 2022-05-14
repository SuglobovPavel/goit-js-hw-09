const REFS = {
   start: document.querySelector("[data-start]"),
   stop: document.querySelector("[data-stop]"),
   body: document.querySelector("body")
}
let intermalId;

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bodyChangeBackgroundStart(e){
   e.currentTarget.disabled  = true;
   bodyChangeBackgroundStartAction = true;
   intermalId = setInterval(()=>{
      REFS.body.style.backgroundColor = getRandomHexColor();
   }, 1000);
}

function bodyChangeBackgroundStop(e){
   REFS.start.disabled = false;
   bodyChangeBackgroundStartAction = false;
   clearInterval(intermalId);
}

REFS.start.addEventListener("click", bodyChangeBackgroundStart);
REFS.stop.addEventListener("click", bodyChangeBackgroundStop);