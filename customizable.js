function myFunction(x) {
  if (x.matches) { // If media query matches
    document.getElementById("fixed-column").classList.remove("position-fixed");
  } else {
    document.getElementById("fixed-column").classList.remove("position-fixed");
  }
}

var x = window.matchMedia("(max-width: 1024px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
