var x = window.matchMedia("(max-width: 1024px)")
var acc = document.getElementsByClassName("faq-accordion");
var i;

$( document ).ready(function() {
  
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

  if (location.href.match(/(?:\b|_)brunswick-pool-tables(?:\b|_)/)) {
      $("#pg_brunswick").removeClass("d-none");
      hideFromPageHeader()
  }
  
  if (location.href.match(/(?:\b|_)pool-table(?:\b|_)/)) {
      $("#pg_pool_table").removeClass("d-none");
      hideFromPageHeader()
  }
  
  if (location.href.match(/(?:\b|_)astrabilliard(?:\b|_)/)) {
      $("#pg_astra_billiards").removeClass("d-none");
      hideFromPageHeader()
  }
  
  if (location.href.match(/(?:\b|_)pool-table-cloth(?:\b|_)/)) {
      $("#pg_pool_table_cloth").removeClass("d-none");
      hideFromPageHeader()
  }
  
  if (location.href.match(/(?:\b|_)accessories(?:\b|_)/)) {
      $("#pg_accessories").removeClass("d-none");
      hideFromPageHeader()
  }
  
  if (location.href.match(/(?:\b|_)billiards-accessories(?:\b|_)/)) {
      $("#pg_billiards_accessories").removeClass("d-none");
      hideFromPageHeader()
  }
  
  if (location.href.match(/(?:\b|_)cue-racks(?:\b|_)/)) {
      $("#pg_cue_racks").removeClass("d-none");
      hideFromPageHeader()
  }
  
  if (location.href.match(/(?:\b|_)pool-cues(?:\b|_)/)) {
      $("#pg_pool_cues").removeClass("d-none");
      hideFromPageHeader()
  }
  
});

function myFunction(x) {
  if (x.matches) { // If media query matches
    $("#fixed-column").removeClass("position-fixed");
  } else {
    $("#fixed-column").addClass("position-fixed");
  }
}

function hideFromPageHeader() {
  $(".page-title").hide();
  $(".layout-module.collection-description.rte").hide();
  $(".page-title-breadcrumbs").addClass("w-100 text-left");
}
