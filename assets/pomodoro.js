function clickClock(action) {
    return function () {
        var count = parseFloat($("#clock").html(), 10) * 1000, // Get value of clock in milliseconds
            interval = 100;
            counter = setInterval(timer, interval);
        $("#clock").off("click").click(pauseClock(counter, action));// Change click event so it pauses the timer
        disableControls();
        animateProgress("#clock");
        console.log("inside clickClock", count);
        function timer() {
            count -= interval;
            console.log("inside timer", count);
            if (count < 0){
                //clearInterval(counter);//counter ended, do something here
                action = action === "#session" ? "#break" : "#session";
                $("#clock").off("click").click(pauseClock(counter, action)); // Change click corresponding to current action
                count = parseFloat($(action).val(), 10) * 1000;
            }
            $("#clock").html(count/1000);
        }
    }
}

function pauseClock(counter, action) {
    return function () {
        clearInterval(counter);
        console.log("inside pauseClock", counter);
        enableControls();
        $("#clock").off("click").click(clickClock(action)); // Change click event so it starts the timer
    }
}
function changeClock() {
    $("#clock").html($("#session").val());
    $("#clock").off("click").click(clickClock("#session"));
}

function changeValue(sign, id){
    return function () {
        var currentValue = parseInt($(id).val(), 10);
        if (sign === "+") 
            $(id).val(currentValue + 1);
        else if (currentValue !== 1)
            $(id).val(currentValue - 1);
        changeClock();
    }
}
function enableControls() {
    $("#breakMinus").click(changeValue("-", "#break"));
    $("#breakPlus").click(changeValue("+", "#break"));
    $("#sessionMinus").click(changeValue("-", "#session"));
    $("#sessionPlus").click(changeValue("+", "#session"));
}

function disableControls() {
    $("#breakMinus").off("click");
    $("#breakPlus").off("click");
    $("#sessionMinus").off("click");
    $("#sessionPlus").off("click");
}

$(document).ready(function () {
    $("#clock").html($("#session").val());
    $("#clock").click(clickClock("#session"));
    enableControls();
});
