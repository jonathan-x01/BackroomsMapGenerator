// The max width of the screen needed for being responsive.
const maxWidth = 580;
const controlBar = document.getElementById("CONTROL_BAR");

// Checks to see if the screen's width is less then or equal to the maxWidth.
function isScreenWidthReady(){
  if (window.screen.width <= maxWidth){
    return true;
  }
  return false;
}

function showControlBar(){
  controlBar.style.display = "flex";
}

function hideControlBar(){
  controlBar.style.display = "none";
}

window.addEventListener("resize",function(){
  if (!isScreenWidthReady()){
    showControlBar();
  }
})
