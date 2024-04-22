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

// upload file function

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("upload-form");
  const uploadBtn = document.getElementById("upload-btn");
  const fileInput = document.querySelector(".file-input");
  const progressArea = document.querySelector(".progress-area");
  const uploadedArea = document.querySelector(".uploaded-area");

  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      uploadFile(fileName, file);
    }
  });

  function uploadFile(name, file) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");
    xhr.upload.addEventListener("progress", (e) => {
      const loaded = Math.floor((e.loaded / e.total) * 100);
      const progressHTML = `<div class="progress-bar">
          <div class="progress" style="width: ${loaded}%"></div>
        </div>`;
      progressArea.innerHTML = progressHTML;
    });

    xhr.addEventListener("load", () => {
      const fileSize =
        file.size < 1024 * 1024
          ? `${Math.floor(file.size / 1024)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
      const uploadedHTML = `<div class="row">
          <i class="fas fa-file-alt"></i>
          <div class="content">
            <div class="details">
              <span class="name">${name} • Uploaded</span>
              <span class="size">${fileSize}</span>
            </div>
          </div>
          <i class="fas fa-check"></i>
        </div>`;
      progressArea.innerHTML = "";
      uploadedArea.insertAdjacentHTML("beforeend", uploadedHTML);
    });

    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  }
});
