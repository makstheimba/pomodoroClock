$(document).ready(function () {
    $("#clock").html($("#session").val());
    $("#clock").click(function (){
        var count = parseInt($("#clock").html(), 10) * 1000; //Get milliseconds
        counter = setInterval(timer, 100);
        function timer()
            {
              count -= 100;
              if (count < 0)
              {
                 clearInterval(counter);
                 //counter ended, do something here
                 return;
              }
                $("#clock").html(count);
            }        
    });
});
