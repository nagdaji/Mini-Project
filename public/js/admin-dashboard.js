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

//for dynamic cards displaying
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const infoTable = document.getElementById("info-table");
  const tableHead = document.getElementById("table-head");
  const tableBody = document.getElementById("table-body");
  const pagination = document.getElementById("pagination");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const currentPageElem = document.getElementById("current-page");
  const totalPagesElem = document.getElementById("total-pages");

  const itemsPerPage = 2;
  let currentPage = 1;
  let data = [];

  const updateTable = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Clear the previous table content
    tableBody.innerHTML = "";

    const paginatedData = data.slice(start, end);

    // Update the table based on card type
    if (data[0].hasOwnProperty("id")) {
      // User/Paper table
      paginatedData.forEach((item) => {
        const row = document.createElement("tr");
        const deleteButton = `<button class="delete-button" data-item-id="${item.id}">❌</button>`;

        row.innerHTML = `
                  <td>${item.id}</td>
                  <td>${item.name}</td>
                  <td>${item.email || item.author || ""}</td>
                  <td>${item.role || item.tracks || item.status || ""}</td>
                  <td>${deleteButton}</td>
              `;

        tableBody.appendChild(row);
      });
    } else if (data[0].hasOwnProperty("serial")) {
      // Speaker table
      paginatedData.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                  <td>${item.serial}</td>
                  <td>${item.name}</td>
              `;
        tableBody.appendChild(row);
      });
    }

    // Update pagination controls
    currentPageElem.textContent = currentPage;
    totalPagesElem.textContent = Math.ceil(data.length / itemsPerPage);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === Math.ceil(data.length / itemsPerPage);
  };

  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateTable();
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      updateTable();
    }
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardType = card.dataset.cardType;
      let tableHeaders = [];

      if (cardType === "user") {
        data = JSON.parse(card.dataset.users);
        tableHeaders = ["User ID", "Name", "Email", "Role", "Actions"];
      } else if (cardType === "paper") {
        data = JSON.parse(card.dataset.papers);
        tableHeaders = [
          "Paper ID",
          "Author Name",
          "Tracks",
          "Current Status",
          "Actions",
        ];
      } else if (cardType === "speaker") {
        data = JSON.parse(card.dataset.speakers);
        tableHeaders = ["Serial Number", "Speaker Name"];
      }

      // Update table header
      tableHead.innerHTML = "";
      tableHeaders.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        tableHead.appendChild(th);
      });

      currentPage = 1; // Reset the page when a different card is clicked
      updateTable();

      // Make the table and pagination visible
      infoTable.classList.remove("hidden");
      pagination.classList.remove("hidden");

      const deleteButtons = document.querySelectorAll(".delete-button");
      deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const itemId = event.target.dataset.itemId;
          console.log(`Item with ID ${itemId} deleted.`);
          event.target.closest("tr").remove(); // Remove the row
          // Update data array to reflect deletion
          data = data.filter((item) => item.id != itemId);
          updateTable(); // Re-render the table
        });
      });
    });
  });
});
