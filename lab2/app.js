(function () {
    // state 0: 开始前 1: 计时中 2: 暂停 3: 计时结束
    let state = 0;
    let up = true;
    // button
    let countupSelector = document.querySelector('.countup');
    let countdownSelector = document.querySelector('.countdown');
    let pauseSelector = document.querySelector('.pause');
    let resumeSelector = document.querySelector('.resume');
    let clearSelector = document.querySelector('.clear');
    let restartSelector = document.querySelector('.restart');
    // text
    let hourSelector = document.querySelector('.hour');
    let minuteSelector = document.querySelector('.minute');
    let secondSelector = document.querySelector('.second');
    let hintSelector = document.querySelector('.hint');
    let timeSelector = document.querySelector('.time');
    // label
    let hourLabel = document.querySelector('.hour-label');
    let minuteLabel = document.querySelector('.minute-label');
    let secondLabel = document.querySelector('.second-label');

    pauseSelector.style.display = 'none';
    resumeSelector.style.display = 'none';
    clearSelector.style.display = 'none';
    restartSelector.style.display = 'none';
    hintSelector.style.display = 'none';

    document.onkeyup = respondKeyUp;

    countupSelector.addEventListener('click', changeStateForCountup);
    countdownSelector.addEventListener('click', changeStateForCountdown);
    clearSelector.addEventListener('click', changeStateForClear);
    restartSelector.addEventListener('click', changeStateForRestart);
    pauseSelector.addEventListener('click', changeStateForPause);
    resumeSelector.addEventListener('click', changeStateForResume);

    let startTime, pauseTime;   // 计时开始的 timestamp
    let total = 0;              // 要计时的总时间，单位为 ms
    let timer, smallTimer;
    function clickCountup() {
        clearSelector.value = "清空正计时";
        hourSelector.style.display = 'none';        minuteSelector.style.display = 'none';
        secondSelector.style.display = 'none';      countupSelector.style.display = 'none';
        countdownSelector.style.display = 'none';   secondLabel.style.display = 'none';
        hourLabel.style.display = 'none';           minuteLabel.style.display = 'none';
        resumeSelector.style.display = 'none';
        clearSelector.style.display = '';           restartSelector.style.display = '';
        pauseSelector.style.display = '';
        
        let hourValue = parseInt(hourSelector.value), minuteValue = parseInt(minuteSelector.value), secondValue = parseInt(secondSelector.value);
        if(hourValue > 59)          hourValue = "59";
        else if(hourValue < 0)      hourValue = "00";
        else if(hourValue < 10)     hourValue = "0" + hourValue;
        
        if(minuteValue > 59)        minuteValue = "59";
        else if(minuteValue < 0)    minuteValue = "00";
        else if(minuteValue < 10)   minuteValue = "0" + minuteValue;

        if(secondValue > 59)        secondValue = "59";
        else if(secondValue < 0)    secondValue = "00";
        else if(secondValue < 10)   secondValue = "0" + secondValue;
        
        hintSelector.innerHTML = "正在正计时 " + hourValue + ":" + minuteValue + ":" + secondValue;
        hintSelector.style.display = '';

        startTime = Date.now();
        total = parseInt(secondValue) + 60 * parseInt(minuteValue) + 3600 * parseInt(hourValue);
        total *= 1000;          // t 单位为 ms, t 为要计时的时间
        if(total > 0)
            timer = setInterval(runUp, 1000);
        else
            changeStateForCountupover("00", "00", "00");
    }

    function runUp() {
        let timeText = timeSelector.innerHTML;
        let arr = timeText.split(":");
        let hourValue = parseInt(arr[0]), minuteValue = parseInt(arr[1]), secondValue = parseInt(arr[2]);
        if(secondValue === 59) {
            if(minuteValue === 59) {
                secondValue = 0;     minuteValue = 0;
                hourValue++;
            } else {
                secondValue = 0;     minuteValue++;
            }
        } else {
            secondValue++;
        }
        if(secondValue < 10)    secondValue = "0" + secondValue;
        if(minuteValue < 10)    minuteValue = "0" + minuteValue;
        if(hourValue < 10)      hourValue = "0" + hourValue;
        timeSelector.innerHTML = hourValue + ":" + minuteValue + ":" + secondValue;
        if((parseInt(hourValue) * 3600 + parseInt(minuteValue) * 60 + parseInt(secondValue)) * 1000 === total)
            changeStateForCountupover(hourValue, minuteValue, secondValue);
    }

    let countdownHourRecord, countdownMinuteRecord, countdownSecondRecord;      // 用于记录倒计时的初始值
    function clickCountdown() {
        clearSelector.value = "清空倒计时";
        hourSelector.style.display = 'none';        minuteSelector.style.display = 'none';
        secondSelector.style.display = 'none';      countupSelector.style.display = 'none';
        countdownSelector.style.display = 'none';   secondLabel.style.display = 'none';
        hourLabel.style.display = 'none';           minuteLabel.style.display = 'none';
        resumeSelector.style.display = 'none';
        clearSelector.style.display = '';           restartSelector.style.display = '';
        pauseSelector.style.display = '';

        let hourValue = parseInt(hourSelector.value), minuteValue = parseInt(minuteSelector.value), secondValue = parseInt(secondSelector.value);
        if(hourValue > 59)          hourValue = "59";
        else if(hourValue < 0)      hourValue = "00";
        else if(hourValue < 10)     hourValue = "0" + hourValue;
        
        if(minuteValue > 59)        minuteValue = "59";
        else if(minuteValue < 0)    minuteValue = "00";
        else if(minuteValue < 10)   minuteValue = "0" + minuteValue;

        if(secondValue > 59)        secondValue = "59";
        else if(secondValue < 0)    secondValue = "00";
        else if(secondValue < 10)   secondValue = "0" + secondValue;
        
        hintSelector.innerHTML = "正在倒计时 " + hourValue + ":" + minuteValue + ":" + secondValue;
        hintSelector.style.display = '';
        timeSelector.innerHTML = hourValue + ":" + minuteValue + ":" + secondValue;

        countdownHourRecord = hourValue;    countdownMinuteRecord = minuteValue;    countdownSecondRecord = secondValue;

        startTime = Date.now();
        total = parseInt(secondValue) + 60 * parseInt(minuteValue) + 3600 * parseInt(hourValue);
        total *= 1000;          // t 单位为 ms, t 为要计时的时间
        if(total > 0)
            timer = setInterval(runDown, 1000);
        else
            changeStateForCountdownover("00", "00", "00");
    }

    function runDown() {
        let timeText = timeSelector.innerHTML;
        let arr = timeText.split(":");
        let hourValue = parseInt(arr[0]), minuteValue = parseInt(arr[1]), secondValue = parseInt(arr[2]);
        if(secondValue === 0) {
            if(minuteValue === 0) {
                secondValue = 59;     minuteValue = 59;
                hourValue--;
            } else {
                secondValue = 59;     minuteValue--;
            }
        } else {
            secondValue--;
        }
        if(secondValue < 10)    secondValue = "0" + secondValue;
        if(minuteValue < 10)    minuteValue = "0" + minuteValue;
        if(hourValue < 10)      hourValue = "0" + hourValue;
        timeSelector.innerHTML = hourValue + ":" + minuteValue + ":" + secondValue;
        if(timeSelector.innerHTML === "00:00:00")
            changeStateForCountdownover(countdownHourRecord, countdownMinuteRecord, countdownSecondRecord);
    }

    function changeStateForCountup() {
        countupSelector.blur();
        if(state === 0){
            state = 1;
            up = true;
            clickCountup();
        }
    }

    function changeStateForCountdown() {
        countdownSelector.blur();
        if(state === 0){
            state = 1;
            up = false;
            clickCountdown();
        }
    }

    function changeStateForCountupover(hourValue, minuteValue, secondValue) {
        clearInterval(timer);
        pauseSelector.style.display = 'none';
        hintSelector.innerHTML = "正计时 " + hourValue + ":" + minuteValue + ":" + secondValue + " 已结束";
        state = 3;
    }

    function changeStateForCountdownover(hourValue, minuteValue, secondValue) {
        clearInterval(timer);
        pauseSelector.style.display = 'none';
        hintSelector.innerHTML = "倒计时 " + hourValue + ":" + minuteValue + ":" + secondValue + " 已结束";
        state = 3;
    }

    function changeStateForPause() {
        pauseSelector.blur();
        if(state === 1) {       // 只有 state === 1 时才显示 pause 按钮，为保险起见加上这个判断语句
            state = 2;
            pauseTime = Date.now();
            clearInterval(timer);
            clearTimeout(smallTimer);
            pauseSelector.style.display = 'none';
            resumeSelector.style.display = '';
            let hintText = hintSelector.innerHTML;
            hintSelector.innerHTML = "暂停" + hintText.substring(2);
        }
    }

    function changeStateForResume() {
        pauseSelector.blur();
        if(state === 2) {       // 只有 state === 2 时才显示 resume 按钮
            state = 1;
            let hintText = hintSelector.innerHTML;
            hintSelector.innerHTML = "正在" + hintText.substring(2);
            resumeSelector.style.display = 'none';
            pauseSelector.style.display = '';
            let delta = pauseTime - startTime;
            let remain = 1000 - (delta % 1000);
            if(up === true) {
                smallTimer = setTimeout(() => {
                    runUp();
                    if(state !== 3)         // 可能 211 行的 runUp 之后计时结束了
                        timer = setInterval(runUp, 1000);
                }, remain);
            } else {
                smallTimer = setTimeout(() => {
                    runDown();
                    if(state !== 3)
                        timer = setInterval(runDown, 1000);
                }, remain);
            }
        }
    }

    function changeStateForClear() {
        if(state === 1) {               // 其他状态无需操作
            clearInterval(timer);
            clearTimeout(smallTimer);
        }
        state = 0;
        hintSelector.style.display = 'none';        pauseSelector.style.display = 'none';
        clearSelector.style.display = 'none';       restartSelector.style.display = 'none';
        resumeSelector.style.display = 'none';
        hourSelector.style.display = '';            minuteSelector.style.display = '';
        secondSelector.style.display = '';          countupSelector.style.display = '';
        countdownSelector.style.display = '';       hourLabel.style.display = '';
        minuteLabel.style.display = '';             secondLabel.style.display = '';
        timeSelector.innerHTML = '00:00:00';        hourSelector.value = '';
        minuteSelector.value = '';                  secondSelector.value = '';
    }

    function changeStateForRestart() {
        restartSelector.blur();
        if(state === 1) {
            clearInterval(timer);
            clearTimeout(smallTimer);
        }
        state = 1;
        if(up === true) {
            timeSelector.innerHTML = "00:00:00";
            clickCountup();
        } else {
            timeSelector.innerHTML = countdownHourRecord + ":" + countdownMinuteRecord + ":" + countdownSecondRecord;
            clickCountdown();
        }
    }

    function respondKeyUp() {
        if(window.event.keyCode === 13) {           // Enter
            if(state === 0)     changeStateForCountup();
        } else if(window.event.keyCode === 32) {    // Space
            if(state === 1)         changeStateForPause();
            else if(state === 2)    changeStateForResume();
        }
    }

})();
