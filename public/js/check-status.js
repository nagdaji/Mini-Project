//for selecting the hovered list item from the menu bar
let list = document.querySelectorAll(".navigation li");

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("click", activeLink));

//for menu bar toggling

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");
let bar = document.querySelector(".toggle-bar");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
  bar.classList.toggle("active");
};

// Get references to the button and modal
var deleteButton = document.getElementById("delete-button");
var modal = document.getElementById("exampleModalCenter");
var closeButton = modal.querySelector(".close");
var yesButton = modal.querySelector(".btn-secondary");
var noButton = modal.querySelector(".btn-primary");

// Function to show the modal
function showModal() {
  modal.style.display = "block";
}

// Function to hide the modal
function hideModal() {
  modal.style.display = "none";
}

// Event listener for button click to show modal
deleteButton.addEventListener("click", showModal);

// Event listener for close button click to hide modal
closeButton.addEventListener("click", hideModal);

// Event listener for "Yes" button click to hide modal
yesButton.addEventListener("click", hideModal);

// Event listener for "No" button click to hide modal
noButton.addEventListener("click", hideModal);
