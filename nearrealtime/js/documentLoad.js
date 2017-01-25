$( document ).ready(function() {
  // Following is green blinking light
  var testerVar = 0;
  function myTimer() {
    if (testerVar == 0){
      $(".led-green").css('background-color','transparent');
      testerVar = 1;
    } else {
      $(".led-green").css('background-color','#55FF00');
      testerVar = 0;
    }
  };
  var sirenTimer = setInterval(myTimer, 500);
});
