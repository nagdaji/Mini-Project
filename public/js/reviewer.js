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

//for the dynamic table
const rowsPerPage = 10; // Number of rows to display per page
let currentPage = 1; // Current page number

// Function to delete a row from the table
function deleteRow(button) {
  const row = button.parentElement.parentElement; // Get the parent row
  const tbody = document
    .getElementById("paperTable")
    .getElementsByTagName("tbody")[0];
  tbody.removeChild(row); // Delete the row
  updatePagination(); // Update pagination after deletion
}

// Function to filter the table based on the selected options
function filterTable() {
  const statusFilter = document.getElementById("statusFilter").value;
  const tracksFilter = document.getElementById("tracksFilter").value;
  const table = document.getElementById("paperTable");
  const tbody = table.getElementsByTagName("tbody")[0];
  const rows = tbody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const status = rows[i].cells[3].innerText; // Get "Status"
    const tracks = rows[i].cells[2].innerText; // Get "Tracks"

    // Check if the row should be visible based on the filters
    const statusMatch = statusFilter === "all" || status === statusFilter;
    const tracksMatch = tracksFilter === "all" || tracks.includes(tracksFilter);

    // Display the row if it matches the filters
    rows[i].style.display = statusMatch && tracksMatch ? "" : "none";
  }
}

// Function to update pagination and control visibility based on current page
function updatePagination(visibleRows = null) {
  const table = document.getElementById("paperTable");
  const tbody = table.getElementsByTagName("tbody")[0];
  const rows = tbody.getElementsByTagName("tr");

  // Ensure correct visible rows count when passed explicitly
  const totalRows = visibleRows || rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Hide all rows initially
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.display = "none";
  }

  // Show rows for the current page
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = currentPage * rowsPerPage;

  for (let i = startRow; i < endRow && i < totalRows; i++) {
    rows[i].style.display = ""; // Show row
  }

  // Enable or disable pagination buttons based on current page
  const previousButton = document.querySelector(
    ".pagination button:first-child"
  );
  const nextButton = document.querySelector(".pagination button:last-child");

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Function to navigate to the previous page
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    updatePagination(); // Update pagination
  }
}

// Function to navigate to the next page
function nextPage() {
  const table = document.getElementById("paperTable");
  const rows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");
  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    updatePagination(); // Update pagination
  }
}

// Initialize pagination on page load
updatePagination();
