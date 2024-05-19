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
  const trackFilter = document.getElementById("track-filter");
  const trackSelect = document.getElementById("track-select");
  const pagination = document.getElementById("pagination");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const currentPageElem = document.getElementById("current-page");
  const totalPagesElem = document.getElementById("total-pages");

  const itemsPerPage = 10;
  let currentPage = 1;
  let data = [];

  const updateTable = (filteredData = null) => {
    const dataSource = filteredData || data;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    tableBody.innerHTML = "";

    const paginatedData = dataSource.slice(start, end);

    if (data[0].hasOwnProperty("id")) {
      // User/Paper table
      paginatedData.forEach((item) => {
        const row = document.createElement("tr");
        const deleteButton = `<button class="delete-button" data-item-id="${item.id}">❌</button>`;

        row.innerHTML = `
                  <td>${item.id}</td>
                  <td>${item.author || item.name}</td>
                  <td>${item.email || item.tracks}</td>
                  <td>${item.role || item.status}</td>
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

    currentPageElem.textContent = currentPage;
    totalPagesElem.textContent = Math.ceil(dataSource.length / itemsPerPage);

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled =
      currentPage === Math.ceil(dataSource.length / itemsPerPage);
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

  trackSelect.addEventListener("change", (event) => {
    const selectedTrack = event.target.value;
    if (selectedTrack) {
      const filteredData = data.filter((item) => item.tracks === selectedTrack);
      currentPage = 1; // Reset to the first page when applying filter
      updateTable(filteredData);
    } else {
      currentPage = 1;
      updateTable(); // Reset filter to show all
    }
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const cardType = card.dataset.cardType;

      if (cardType === "user") 
      {
        if(document.getElementById("usertable").classList == "hidden")
        {
          document.getElementById("usertable").classList.remove("hidden");
          document.getElementById("authortable").classList.add("hidden");
          document.getElementById("attendtable").classList.add("hidden");
          document.getElementById("speakertable").classList.add("hidden");
        }
        else
        {
          document.getElementById("usertable").classList.add("hidden");
        }
      }
      else if(cardType === "author")
      {
        if(document.getElementById("authortable").classList == "hidden")
        {
          document.getElementById("authortable").classList.remove("hidden");
          document.getElementById("usertable").classList.add("hidden");
          document.getElementById("attendtable").classList.add("hidden");
          document.getElementById("speakertable").classList.add("hidden");
        }
        else
        {
          document.getElementById("authortable").classList.add("hidden");
        }
      }

      else if(cardType === "attendee")
      {
        if(document.getElementById("attendtable").classList == "hidden")
        {
          document.getElementById("attendtable").classList.remove("hidden");
          document.getElementById("usertable").classList.add("hidden");
          document.getElementById("authortable").classList.add("hidden");
          document.getElementById("speakertable").classList.add("hidden");
        }
        else
        {
          document.getElementById("attendtable").classList.add("hidden");
        }
      }

      else if(cardType === "speaker")
      {
        if(document.getElementById("speakertable").classList == "hidden")
        {
          document.getElementById("speakertable").classList.remove("hidden");
          document.getElementById("usertable").classList.add("hidden");
          document.getElementById("authortable").classList.add("hidden");
          document.getElementById("attendtable").classList.add("hidden");
        }
        else
        {
          document.getElementById("speakertable").classList.add("hidden");
        }
      }
      
      // let tableHeaders = [];

      // if (cardType === "user") {
      //   data = JSON.parse(card.dataset.users);
      //   tableHeaders = ["User ID", "Name", "Email", "Role", "Delete"];
      //   trackFilter.classList.add("hidden"); // Hide filter when not required
      // } else if (cardType === "speaker") {
      //   data = JSON.parse(card.dataset.speakers);
      //   tableHeaders = ["Serial Number", "Speaker Name"];
      //   trackFilter.classList.add("hidden"); // Hide filter
      // } else {
      //   tableHeaders = "";
      // }

      // Update the table header
      // tableHead.innerHTML = "";
      // tableHeaders.forEach((header) => {
      //   const th = document.createElement("th");
      //   th.textContent = header;
      //   tableHead.appendChild(th);
      // });

      currentPage = 1; // Reset to the first page when switching data
      updateTable();

      // Make the table and pagination visible
      // infoTable.classList.remove("hidden");
      // pagination.classList.remove("hidden");

      // const deleteButtons = document.querySelectorAll(".delete-button");
      // deleteButtons.forEach((button) => {
      //   button.addEventListener("click", (event) => {
      //     const itemId = event.target.dataset.itemId;
      //     console.log(`Item with ID ${itemId} deleted.`);
      //     event.target.closest("tr").remove(); // Remove row from table
      //     data = data.filter((item) => item.id != itemId); // Update data array
      //     updateTable(); // Re-render table after deletion
      //   });
      // });
    });
  });
});
