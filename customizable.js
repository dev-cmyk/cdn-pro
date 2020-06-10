var fixed_column = document.getElementById("fixed-column");

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  fixed_column.classList.remove("position-fixed");
} else {
  fixed_column.classList.add("position-fixed");
}
