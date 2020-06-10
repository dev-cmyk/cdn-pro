var x = window.matchMedia("(max-width: 1024px)")

$( document ).ready(function() {
    
  $("#contact_phone").addClass("w-100");
  $("#contact_question").addClass("w-100");
  
  $("input.button.button-primary").addClass("w-100 btn-astra-gold border-0");
    
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  
});

function myFunction(x) {
  if (x.matches) { // If media query matches
    $("#fixed-column").removeClass("position-fixed");
  } else {
    $("#fixed-column").addClass("position-fixed");
  }
}
