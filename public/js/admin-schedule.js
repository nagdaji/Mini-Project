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


//calendar
function displayData() {
  const form = document.getElementById('event-info');
  const evename = form.elements['evname'].value;
  const des = form.elements['description'].value;
  const dt = form.elements['date'].value;
  const time = form.elements['event-time'].value;
  const dataList = document.getElementById('desc');
  const listItem = document.createElement('li');
  listItem.textContent = `Event: ${name}, Date & Time: ${dt}:${time}, Description: ${email}`;
  dataList.appendChild(listItem);
}
