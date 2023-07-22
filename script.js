const setBtn = document.getElementById("set_btn");
const no_alarm_msg = document.getElementById('textmassage');

const audioElement = document.getElementById('alarm-tone');
audioElement.style.display = 'none';
let timers = [];
let seconds = '';
let alarm = 0;

setBtn.addEventListener('click',(event)=>{
    let hour = parseInt(document.getElementById("hour").value);
    let min = parseInt(document.getElementById("min").value);
    let sec = parseInt(document.getElementById("sec").value);
    // console.log(hour , min , sec); 
    seconds = hour * 60 * 60 + min * 60 + sec;
    // console.log(seconds);
    event.preventDefault()
    checkValidTime(event, min, sec);
})


function checkValidTime(event, min, sec){
    if(min<60 && min>=0 && sec<60 && sec>=0 ){
        // console.log(event);
        obj = {name:timers.length + 1, duration: seconds};
        // if(obj.duration != '0'){
        //     timers.push(obj);        
        // }
        timers.push({name:timers.length + 1, duration: seconds});
        console.log(timers);
        initializeTimers(timers[timers.length - 1]);
    }
    else alert('Please enter valid time!!!! ex -> 00:00:60');
}

const timerLists = document.getElementById("list_timers")

// if time have one or more obje then its working
function initializeTimers(timer){
    
    var NewtimerBox = document.createElement('div');
    NewtimerBox.setAttribute('id' , timer.name);
    NewtimerBox.className = 'timer-div';

    NewtimerBox.innerText = ``;

    timerLists.appendChild(NewtimerBox)
    timeHandling(timer);
    alarm++;
}


function updateTimerDisplay(timer) {
    if (document.getElementById(timer.name)) {
        const timerElement = document.getElementById(timer.name);
        timerElement.innerHTML =  `<div class="timer-div setTime">
                <h3 class="Text-setTime">Time Left :</h3> 
                <input type="number" id="hour" value="${Math.floor(timer.duration / 3600).toString().padStart(2, '0')}" >
                <span><h2 class="Text-setTime">:</h2></span>
                <input id="minute" type="number" value="${Math.floor((timer.duration % 3600) / 60).toString().padStart(2, '0')}" >
                <span><h2 class="Text-setTime">:</h2></span>
                <input id="second" type="number" value="${Math.floor(timer.duration % 60).toString().padStart(2, '0')}">
                <button id='set_btn' onClick="deleteAlarm(${timer.name})" class="deletBtn" >Delete</button>
             </div>`
             ;
    }
    
}


function timeHandling(timer){
    updateTimerDisplay(timer)
    timer.interval = setInterval(function(){
       timer.duration--;
       updateTimerDisplay(timer);
       if(timer.duration <=0){
         clearInterval(timer.interval);
       
        if(document.getElementById(timer.name)){
         const timerElement= document.getElementById(timer.name)
         timerElement.className = 'finish_timers';
         timerElement.innerHTML = `<div class="finish_timers">
              <h1 class="Time_out">Timer is Up!</h1> 
              <button class="StopBtn" onClick="deleteAlarm(${timer.name})">Stop</button> 
              </div>`;

            playMusic();
      }
    } 

    },1000)
}   

function deleteAlarm(elementId) {
    // console.log(event.target);
    timerLists.removeChild(document.getElementById(`${elementId}`));
    timers.splice(elementId - 1, 1);
    alarm--;
    console.log(alarm);
    stopMusic();
    
}


function noAlarmOnScreen() {
    
    // display message
    if (alarm === 0) {
        no_alarm_msg.style.display = 'block';
        // console.log('tst');
    }
    else {
        no_alarm_msg.style.display = 'none';
    }
}

function playMusic() {
    console.log('music played');
    audioElement.play();
}

function stopMusic() {
    console.log('music stopd');
    audioElement.pause();
    audioElement.currentTime = 0;
}

setInterval(noAlarmOnScreen, 100);