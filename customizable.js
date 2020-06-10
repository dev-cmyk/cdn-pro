var fc = document.getElementById("fixed-column");

function myFunction(x) {
  if (x.matches) { // If media query matches
    fc.classList.remove("position-fixed");
  } else {
    fc.classList.add("position-fixed");
  }
}

var x = window.matchMedia("(max-width: 1024px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
