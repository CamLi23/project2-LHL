$( document ).ready(function() {
  var textArea = document.getElementById("textArea");
  var counter = document.getElementsByClassName("counter");

  textArea.addEventListener("keyup", function updateCount(event) {
    var update = 140 - this.value.length;
    counter[0].innerHTML = update;
    if (update < 0) {
      counter[0].style.color = "red";
    }
  });

});

