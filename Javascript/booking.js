//declaration des variables liees aux inputs 
let name = document.getElementById('name-field');
let surname = document.getElementById('surname-field');


function saveNames() {
  let key = name.value;
  let value = surname.value;

  if (key && value) {
    localStorage.setItem(key, value);
  }
  else {
    alert("Champs invalides");
  }
};

canvasButton.addEventListener('click', () => {
  canvasContainer.style.display='block';
  saveNames();  
})

let validButton = document.getElementById('valid-button');
let prefooter = document.getElementById('prefooter');
let 

validButton.addEventListener('click', () => {
  if (validform = true) {
    prefooter.style.display='block';

  }
})