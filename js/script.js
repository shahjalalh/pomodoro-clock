var timer;
var isRunning = false;
var breakLength = 5 * 60, sessionLength = 25 * 60;
var currentSession = "session", currentLength = sessionLength;

function formatNumber(num) {
    return (num < 10) ? "0" + num : num;
}

function secsToTime(num) {

    num = parseInt(num)

    var hrs = Math.floor(num / 3600);
    var mins = Math.floor(num % 3600 / 60);
    var secs = Math.floor(num % 3600 % 60);

    hrs = (hrs > 0) ? formatNumber(hrs) + ":" : "";
    mins = (mins > 0) ? formatNumber(mins) + ":" : "00:";
    secs = formatNumber(secs);

    return hrs + mins + secs;
}

function timeToSecs(time) {

    time = time.split(":");
    var counter = 0, numSecs = 0;

    while (time.length !== 0) {
        numSecs += parseInt(time.pop()) * Math.pow(60, counter);
        counter++;
    }

    return numSecs;
}

function setBackground(time) {
    var current = timeToSecs(time);
    var percentage = 100 - Math.floor(current / currentLength * 100);
    $('#filler').css('height', percentage + '%');
}

function clock() {

    var secs = timeToSecs($('#time-left').text());
    secs--;

    if (secs >= 0) {
        var str = secsToTime(secs);
        $('#time-left').text(str);
        setBackground(str);

    }

    else {
        if (currentSession === "session") {
            currentSession = "break";
            currentLength = breakLength;
            $('#session').text("Break!");
            $('#filler').css('background-color', "#EB3333");
        }
        else {
            currentSession = "session";
            currentLength = sessionLength;
            $('#session').text("Session");
            $('#filler').css('background-color', "#00FF00");
        }
        $('#time-left').text(secsToTime(currentLength));
        setBackground(secsToTime(currentLength));
    }
}

function startTime() {
    timer = setInterval(clock, 1000);
}

function stopTime() {
    clearInterval(timer);
}

function reset() {
    if (isRunning) {
        stopTime();
        isRunning = false;
    }
    currentSession = "session";
    currentLength = sessionLength;
    $('#session').text("Session");
    $('#filler').css('background-color', "#00FF00");
    $('#filler').css('height', "0");
    $('#time-left').text(secsToTime(currentLength));
}

function toggleTimer() {
    if (isRunning) {
        stopTime();
        isRunning = false;
    }
    else {
        startTime();
        isRunning = true;
    }
}

$(document).ready(function () {

    $("#break-minus").click(function () {

        if (!isRunning) {
            var num = parseInt($('#break-length').text());
            num = (num > 0) ? num - 1 : num;
            $("#break-length").text(num);
            breakLength = num * 60;

            if (currentSession === "break") {
                reset();
            }
        }
    });
    $("#break-plus").click(function () {

        if (!isRunning) {
            var num = parseInt($('#break-length').text());
            num++;
            $("#break-length").text(num);
            breakLength = num * 60;

            if (currentSession === "break") {
                reset();
            }
        }
    });
    $("#session-minus").click(function () {

        if (!isRunning) {
            var num = parseInt($('#session-length').text());
            num = (num > 1) ? num - 1 : num;
            $("#session-length").text(num);
            sessionLength = num * 60;

            if (currentSession === "session") {
                reset();
            }
        }
    });
    $("#session-plus").click(function () {

        if (!isRunning) {
            var num = parseInt($('#session-length').text());
            num++;
            $("#session-length").text(num);
            sessionLength = num * 60;

            if (currentSession === "session") {
                reset();
            }
        }
    });
});