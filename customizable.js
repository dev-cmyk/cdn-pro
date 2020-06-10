var fc = document.getElementById("fixed-column");
var x = window.matchMedia("(max-width: 1024px)")

$( document ).ready(function() {
    
  $("div[id^='contact']").addClass("w-100");
  
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  
});

function myFunction(x) {
  if (x.matches) { // If media query matches
    fc.classList.remove("position-fixed");
  } else {
    fc.classList.add("position-fixed");
  }
}
