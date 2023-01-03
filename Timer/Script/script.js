//#region Constants

//  Time
const TIME = {
    MAX : {
        HOURS : 23,
        TENS_OF_HOUR : 2,
        UNITS_OF_HOUR : 3,


        MINUTES : 59,
        TENS_OF_MINUTE : 5,
        UNITS_OF_MINUTE : 9,


        SECONDS : 59,
        TENS_OF_SECOND : 5,
        UNITS_OF_SECOND : 9,
    }
};

//#endregion

//#region Functions

function valueMinMax(valueToCheck, minimumValue,maximumValue) {
    if(valueToCheck <= minimumValue)
        return minimumValue;
    else if(valueToCheck >= maximumValue)
        return maximumValue;
    return valueToCheck;
}

//#endregion

//#region Selectors

//  Timer
const timer = document.getElementById("timer");
const timerDigits = document.querySelectorAll(".timer-digits");
//#endregion


//#region Timer sections
let timeAtStartInSeconds;
let timerUpdaterIntervalID;
let timerIsRunning = false;
let intialTimeInMilliseconds;

function startTimer() {
    timeAtStartInMilliseconds = new Date().getTime();
    const initialHours = parseInt(timerDigits[0].value + timerDigits[1].value);
    const initialMinutes = parseInt(timerDigits[2].value + timerDigits[3].value);
    const initialSecondes = parseInt(timerDigits[4].value + timerDigits[5].value);
    intialTimeInMilliseconds = ((initialHours * 3600) + (initialMinutes * 60) + initialSecondes) * 1000;

    updateTimer();
    timerUpdateIntervalID = setInterval(updateTimer, 500);
    timerIsRunning = true;
}

function updateTimer() {
    const timeAtUpdateInMilliseconds = new Date().getTime();
    const MillisecondsThatHasPassedSinceTheStart = timeAtUpdateInMilliseconds - timeAtStartInMilliseconds;
    const updatedTimeInSeconds = parseInt((intialTimeInMilliseconds - MillisecondsThatHasPassedSinceTheStart) / 1000);
    if(updatedTimeInSeconds <= 0)
    {
        updatedTimeInSeconds = 0;
        stopTimer();
    }
    timerDigits[5].value = updatedTimeInSeconds % 10;
    timerDigits[4].value = parseInt(updatedTimeInSeconds % 60 / 10);
    timerDigits[3].value = parseInt(updatedTimeInSeconds / 60 % 10);
    timerDigits[2].value = parseInt(updatedTimeInSeconds / 60 % 60 / 10); 
    timerDigits[1].value = parseInt(updatedTimeInSeconds / 3600 % 10);
    timerDigits[0].value = parseInt(updatedTimeInSeconds / 3600 / 10);
}

function stopTimer() {
    clearInterval(timerUpdateIntervalID);

    timerIsRunning = false;
}
//#endregion



// Window event
document.addEventListener("keydown", event => {
    if(event.repeat) return;
    
    if(event.key == "Enter" || event.key == " ") 
        if(!timerIsRunning) 
            startTimer();
        else
            stopTimer();
});


// Text inputs event
timerDigits.forEach((element, index) => {

    element.addEventListener("keydown", event => {
        // Determining the maximum value the input can be
        timeUnit = element.classList[1];
        UnitDigit = element.classList[2];
        let maxDigit;
        const currentTensOfHour = parseInt(timerDigits[0].value);
        if(currentTensOfHour == TIME.MAX.TENS_OF_HOUR) console.log(currentTensOfHour);
        switch (timeUnit)
        {
            case "hours":
                if(UnitDigit == "second-digit")
                    maxDigit = TIME.MAX.TENS_OF_HOUR;
                else
                    maxDigit = (currentTensOfHour == TIME.MAX.TENS_OF_HOUR)? TIME.MAX.UNITS_OF_HOUR : 9;
                break;
            case "minutes":
                if(UnitDigit == "second-digit")
                    maxDigit = TIME.MAX.TENS_OF_MINUTE;
                else
                    maxDigit = TIME.MAX.UNITS_OF_MINUTE;
                break;
            case "seconds":
                if(UnitDigit == "second-digit")
                    maxDigit = TIME.MAX.TENS_OF_SECOND;
                else
                    maxDigit = TIME.MAX.UNITS_OF_SECOND;
                break;
        }

        // If an integer key is pressed
        let keyPressedAsInteger = parseInt(event.key);
        if(event.key == "Backspace") return;
        if(Number.isInteger(keyPressedAsInteger))
            element.value = valueMinMax(keyPressedAsInteger, 0,maxDigit);

        // Navigate with space
        if(event.key == " " && event.ctrlKey) 
        {
            const offset = event.shiftKey? -1 : 1;
            const nextIndex = valueMinMax(index + offset, 0, 5);
            timerDigits[nextIndex].focus();
        }
        // Navigate and changing values with arrows and ZQSD
        let offset;
        switch (event.key)
        {
            case "ArrowUp":
            case "Z":
            case "ArrowDown":
            case "S":
                const elementValueAsInt = parseInt(element.value);
                offset = (event.key == "ArrowDown") || (event.key == "S")? -1 : 1;
                let finalValueToDisplay = (elementValueAsInt + offset);
                finalValueToDisplay -= (Math.floor(finalValueToDisplay / (maxDigit + 1)) * (maxDigit + 1));
                element.value = finalValueToDisplay;
                break;
            case "ArrowRight":
            case "D":
            case "ArrowLeft":
            case "Q":
                offset = (event.key == "ArrowLeft") || (event.key == "Q")? -1 : 1; 
                timerDigits[index + offset].focus();
                break;
        }
    });

    //#region Correcting value
    let correctValueOfTimer = () => {
        elementValueAsInteger = parseInt(element.value);
        element.value = !Number.isInteger(elementValueAsInteger)? 0: elementValueAsInteger;   
    }
    element.addEventListener("input", () => {
        console.log(element.value);
        if(element.value == "") return;
         
        correctValueOfTimer();
    });
    element.addEventListener("blur", () => {
        correctValueOfTimer();
    });
    //#endregion
});


