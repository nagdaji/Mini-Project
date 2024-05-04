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

function filterPapers(status) {
  // Get all rows in the table
  var rows = document.querySelectorAll("#table-container tbody tr");

  // Show or hide rows based on the selected filter
  rows.forEach(function (row) {
    if (status === "all" || row.getAttribute("data-status") === status) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  // Highlight the active filter button
  var options = document.querySelectorAll(".filter-dropdown");
  options.forEach(function (option) {
    if (option.value === status) {
      option.setAttribute("selected", "selected");
    } else {
      option.removeAttribute("selected");
    }
  });
}
