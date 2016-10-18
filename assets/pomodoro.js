
var clockMaker = function (clockId) {
   var minute = 60000,
       session = 25*minute,
       rest = 5*minute,
       timer = session,
       interval = 1000,
       running = "session",
       counter = false,
       audioAlarm = new Audio("https://notificationsounds.com/soundfiles/cf67355a3333e6e143439161adc2d82e/file-sounds-874-gets-in-the-way.mp3");
       
    function convertMs(ms){
        return (("0" + (ms / minute << 0)).slice(-2) + ":" + ("0" + ms % minute / 1000).slice(-2));
    }
    
    function setRunningLabel () {
        if (running === "rest") {
            $("#runningLabel").html("BREAK");
            $("#clockDisplay").removeClass("workSession").addClass(" restSession");
        } else {
            $("#runningLabel").html("WORK");
            $("#clockDisplay").removeClass("restSession").addClass(" workSession");;
        }        
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
                    audioAlarm.play();
                    if (running === "session"){
                        timer = rest;
                        running = "rest";
                    } else {
                        timer = session;
                        running = "session";
                    }
                    setRunningLabel();
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
            setRunningLabel();
        },
        getSessionLength: function () {
            return convertMs(session);
        },
        getRestLength: function () {
            return convertMs(rest);
        },
        setSessionLength: function (len) {
            session = len * minute;
            this.resetClock();
        },
        setRestLength: function (len) {
            rest = len * minute;
            this.resetClock();
        },
        setTimerToId: function () {
            $(clockId).html(convertMs(timer));
        }
    }
};

window.onload = function () {    
    var clock = clockMaker("#clock"),
        audioStart = new Audio("https://notificationsounds.com/soundfiles/087408522c31eeb1f982bc0eaf81d35f/file-sounds-949-you-wouldnt-believe.mp3");
    
    $(".clockWrap").on("click", function () {
        clock.start();
        audioStart.play();
    });
    $("#btnSettingsShow").on("click", function () {
        $(".settingsScreen").show();
        $(this).hide();
    });
    $("#btnSettingsHide").on("click", function () {
        $(".settingsScreen").hide();
        $("#btnSettingsShow").show();
    });
    
    (function () {
        var baseSlider = {
            animate: "slow",
            max: 59,
            min: 1,
            range: "max"
        },
            sessionSliderOptions = Object.assign({}, baseSlider),
            restSliderOptions = Object.assign({}, baseSlider);
        
        $.extend(sessionSliderOptions, {
            value: 25,
            slide: function (event, ui) {
                $("#sessionLength").html(ui.value + (ui.value === 1 ? " minute" : " minutes"));
                clock.setSessionLength(ui.value);
            }
        });
        $.extend(restSliderOptions, {
            value: 5,
            slide: function (event, ui) {
                $("#restLength").html(ui.value + (ui.value === 1 ? " minute" : " minutes"));
                clock.setRestLength(ui.value);
            }
        });
        
        $("#sessionSlider").slider(sessionSliderOptions);
        $("#restSlider").slider(restSliderOptions);
    }());
}