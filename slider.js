var lesImagesDuSlider = document.getElementsByClassName("slider-image");
var sliderIndex = 0;
var auto4s = true;
diapoAuto();

function diapoAuto() {
  for (let i = 0; i < lesImagesDuSlider.length; i++) {
    lesImagesDuSlider[i].style.display = "none";
  }
  sliderIndex++;
  if (sliderIndex > lesImagesDuSlider.length)  {
    sliderIndex = 1;
  }
  lesImagesDuSlider[sliderIndex-1].style.display = "block";
  auto4s = setTimeout(diapoAuto, 3000);
}
function diapoManuel() {
  clearTimeout(auto4s);
}
