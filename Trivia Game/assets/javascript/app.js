$(document).ready(function(){
    $("#start-button").click(function(){
        var number = 50;
        alert("The let game begin!");
      $("#start-button").on("click", start); 
      $("#submit").on("click", finish); 
      $("#restart").on("click", restart); 
      function start(){
          counter = setInterval(timer, 1000);
          showMe(".question");
          showMe(".answers");
          showMe("#submit");
          hideMe("#start-button");
          hideMe(".rules");
          hideMe("#restart");
          hideMe("#results");
      }
      function timer(){
        number--;
        $("#show-number").html("<h2>" + number + "</h2>" );
        if (number === 0){
          alert("Times Up!")
          stop();
        }
      }
      function stop(){
          clearInterval(counter);
          $("#results").show();
          $("#restart").show();
          $(".question").hide();
          $(".answers").hide();
          $("#submit").hide();
      }
      function finish(){
          number = 1;
          clearInterval(counter);
          timer();
      }
  
      function restart(){
          number = 50;
          start();
      }
  
      function hideMe(e) {
          $(e).hide();
      }
      function showMe(e) {
          $(e).show();
      }
  
        start();
    });
  });
  