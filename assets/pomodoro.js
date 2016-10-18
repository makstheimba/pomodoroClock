var clockMaker = function (clockId) {
   var minute = 60000,
       session = 25*minute,
       rest = 5*minute,
       timer = session,
       interval = 1000,
       running = "session",
       counter = false;
    function convertMs(ms){
        return (("0" + (ms / minute << 0)).slice(-2) + ":" + ("0" + ms % minute / 1000).slice(-2));
    }
    
    return {
        start: function () {
            console.log("start", this);
            var self = this;
            if (counter === false) // Start the counter if there is none
                counter = setInterval(function(){countdown();}, interval);
            else // Pause the timer if counter is running
                this.pause();            
            function countdown() {
                console.log(counter);
                timer = timer - interval;
                console.log(timer);
                if (timer < 0) {
                    if (running === "session"){
                        timer = rest;
                        running = "rest";
                    } else {
                        timer = session;
                        running = "session";
                    }
                }
                self.setTimerToId();
            }
            
        },
        pause: function () {
            console.log("pause");
            clearInterval(counter);
            counter = false;
            console.log(counter);
        },
        resetClock: function () {
            console.log("reset");
            this.pause();
            running = "session";
            timer = session;
            this.setTimerToId();
        },
        increaseRest: function () {
            console.log("increase rest");
            if (rest < minute * 59){
                rest += minute;
            }
            this.resetClock();
        },
        decreaseRest: function () {
            if (rest > minute) {
                rest -= minute;
            }            
            this.resetClock();
        },
        increaseSession: function () {
            if (session < minute * 59) {
                session += minute;                
            }
            this.resetClock();
        },
        decreaseSession: function () {
            if (session > minute) {
                session -= minute;
            }
            this.resetClock();
        },
        getSessionLength: function () {
            return convertMs(session);
        },
        getRestLength: function () {
            return convertMs(rest);
        },
        setTimerToId: function () {
            $(clockId).html(convertMs(timer));
        }
    }
};

window.onload = function () {
    
    clock = clockMaker("#clock");
    $("#sessionPlus").on("click", function () {
        clock.increaseSession();
        $("#session").val(clock.getSessionLength());
    });
    $("#sessionMinus").on("click", function () {
        clock.decreaseSession();
        $("#session").val(clock.getSessionLength());
    });
    $("#restPlus").on("click", function () {
        clock.increaseRest();
        $("#rest").val(clock.getRestLength());
    });
    $("#restMinus").on("click", function () {
        clock.decreaseRest();
        $("#rest").val(clock.getRestLength());
    });
    $(".clockWrap").on("click", function () {clock.start();});
}