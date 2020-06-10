var fixed_column = document.getElementById("fixed-column");

function myFunction(x) {
  if (x.matches) { // If media query matches
    fixed_column.classList.remove("position-fixed");
  } else {
    fixed_column.classList.remove("position-fixed");
  }
}

var x = window.matchMedia("(max-width: 1024px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes
