import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const REFS = {
   start: document.querySelector("[data-start]"),
   days: document.querySelector("[data-days]"),
   hours: document.querySelector("[data-hours]"),
   minutes: document.querySelector("[data-minutes]"),
   seconds: document.querySelector("[data-seconds]")
}

REFS.start.disabled = true;

const dataNow = Date.now();
let timerId = null;
let dateFinishTimer;

const dataStart = flatpickr("#datetime-picker", {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      let dateSelected = selectedDates[0];
      if(dataNow > dateSelected){
         Notiflix.Notify.failure('Please choose a date in the future');
         return false;
      }
      REFS.start.disabled = false;
      dateFinishTimer = new Date(dateSelected).getTime();
   },
});

function timerStart(){
   if(timerId){
      return false;
   }

   timerId = setInterval((dateFinishTimer)=>{
      let dateStartTimer = Date.now();
      let timerSet = dateFinishTimer - dateStartTimer;
      let result = convertMs(timerSet);
      timerRender(result);   
   }, 1000, dateFinishTimer);
}

function timerRender( obj ){
   REFS.days.innerHTML = addLeadingZero(obj.days);
   REFS.hours.innerHTML = addLeadingZero(obj.hours);
   REFS.minutes.innerHTML = addLeadingZero(obj.minutes);
   REFS.seconds.innerHTML = addLeadingZero(obj.seconds);
}

function addLeadingZero(time){
   return time.toString().padStart(2, "0");
}

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

REFS.start.addEventListener("click", timerStart);