let lesImagesDuSlider = document.getElementsByClassName("slider-image");
let sliderIndex = 0;
let auto5s = 0;
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
  auto5s = setTimeout(diapoAuto, 5000);
}
function diapoManuel() {
  clearTimeout(auto5s)
}

/*display none le pause;
display block bouton play;


fonction fleche de gauche
commencer la programmation orientee Object = class constructor et this
*/
