var x = window.matchMedia("(max-width: 1024px)")
var acc = document.getElementsByClassName("faq-accordion");
var i;

$( document ).ready(function() {
    
  $("#contact_phone").addClass("w-100");
  $("#contact_question").addClass("w-100");
  
  $("input.button.button-primary").addClass("w-100 btn-astra-gold border-0");
    
  $(".form-field-title").addClass("cu-font");
    
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  
  for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("faq-active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
  }
    
});

function myFunction(x) {
  if (x.matches) { // If media query matches
    $("#fixed-column").removeClass("position-fixed");
  } else {
    $("#fixed-column").addClass("position-fixed");
  }
}
