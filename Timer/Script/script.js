/*
//#region Constants
const NUMBER_OF_SECONDS_IN_A_MINUTE = 60;
const NUMBER_OF_SECONDS_IN_A_HOUR = NUMBER_OF_SECONDS_IN_A_MINUTE * 60;

const SECONDS_IN_INITIAL_TIME = 10;
const MINUTES_IN_INITIAL_TIME = 0;
const HOURS_IN_INITIAL_TIME = 0;
const INITIAL_TIME_IN_SECONDS = (HOURS_IN_INITIAL_TIME*NUMBER_OF_SECONDS_IN_A_HOUR) + (MINUTES_IN_INITIAL_TIME*NUMBER_OF_SECONDS_IN_A_MINUTE) + SECONDS_IN_INITIAL_TIME;
//#endregion

//#region Selectors
const timerElement = document.getElementById('timer');
const textArea = document.querySelector('textarea');
//#endregion

//#region Functions
function formatStringOfNumber(stringOfNumber) {
    if(stringOfNumber.length < 2)
        stringOfNumber = "0" + stringOfNumber;

    return stringOfNumber;
}
function convertSecondsInStringToDisplay(totalSeconds) {
    let hoursString = parseInt(totalSeconds / NUMBER_OF_SECONDS_IN_A_HOUR).toString();
    let minutesString = parseInt((totalSeconds % NUMBER_OF_SECONDS_IN_A_HOUR) / NUMBER_OF_SECONDS_IN_A_MINUTE).toString();
    let secondesString = parseInt(totalSeconds % NUMBER_OF_SECONDS_IN_A_MINUTE).toString();

    hoursString = formatStringOfNumber(hoursString);
    minutesString = formatStringOfNumber(minutesString);
    secondesString = formatStringOfNumber(secondesString);

    return `${hoursString}:${minutesString}:${secondesString}`;
}

function convertDateToSeconds(date) {
    return (date.getHours()*NUMBER_OF_SECONDS_IN_A_HOUR) + (date.getMinutes()*NUMBER_OF_SECONDS_IN_A_MINUTE) + date.getSeconds();
}
function startTimer() {
    let currentDate = new Date();
    intialTimeOfTimer = convertDateToSeconds(currentDate); 
    timeOutId = setTimeout(updateTime, 1000);
}
function updateTime() {
    let currentDate = new Date();
    let currentTime = convertDateToSeconds(currentDate);
    let timeThatHasPassedSinceTheStart = intialTimeOfTimer - currentTime;
    remainingTimeInTimerInSeconds = INITIAL_TIME_IN_SECONDS + timeThatHasPassedSinceTheStart;
    if(remainingTimeInTimerInSeconds < 0)
    {
        remainingTimeInTimerInSeconds = 0;

        timerElement.innerText = convertSecondsInStringToDisplay(remainingTimeInTimerInSeconds.toString());
        return;
    }

    timerElement.innerText = convertSecondsInStringToDisplay(remainingTimeInTimerInSeconds.toString());

    timeOutId = setTimeout(updateTime, 1000);
}
function stopTimer() {
    
}
//#endregion

let intialTimeOfTimer;
let timeOutId;
let remainingTimeInTimerInSeconds;

startTimer();


document.addEventListener("keydown", (event) => 
{
    if(inputElement != document.activeElement)
        return;
});

*/