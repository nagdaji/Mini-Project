const forms = document.querySelector(".forms"),
  show = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");

const requirementList = document.querySelectorAll(".requirement-list li");
// console.log(requirementList);
let message = document.querySelector(".message");

let password_value = document.querySelector(".input-field input");
const requirements = [
  { regex: /.{8,}/, index: 0 },
  { regex: /[a-z]/, index: 1 },
  { regex: /[A-Z]/, index: 2 },
  { regex: /[^A-Za-z0-9]/, index: 3 },
  { regex: /[0-9]/, index: 4 },
];

//this is for password validation with given points
let passhandle = document.getElementById("password");
passhandle.addEventListener("keyup", (e) => {
  //   console.log(e.target.value);
  requirements.forEach((item) => {
    const isValid = item.regex.test(e.target.value);
    const requirementItem = requirementList[item.index];
    // console.log(requirementItem.childNodes);
    if (isValid) {
      requirementItem.childNodes[1].className = "fa-solid fa-check";
      requirementItem.classList.add("valid");
    } else {
      requirementItem.firstElementChild.className = "fa-solid fa-circle";
      requirementItem.classList.add("valid");
    }
  });
});

//this is for password and confirm password checking

let confirm = document.getElementById("confirm-password");
let passvalue = document.getElementById("password");
confirm.addEventListener("keyup", (e) => {
  //   console.log(passvalue);
  let confirmvalue = e.target.value;
  if (passvalue.value.length != 0 && confirm.value.length != 0) {
    if (confirmvalue === passvalue.value && passvalue.value.length != 0) {
      message.textContent = "Password Matched";
      message.classList.add("valid");
      document.getElementById("register").disabled = false;
    } else {
      message.textContent = "Password MisMatch";
      message.classList.remove("valid");
      document.getElementById("register").disabled = true;
    }
  } else {
    message.textContent = " ";
  }
});
passvalue.addEventListener("keyup", (e) => {
  //   console.log(passvalue);
  let confirmvalue = e.target.value;
  if (passvalue.value.length != 0 && confirm.value.length != 0) {
    if (confirmvalue === confirm.value) {
      message.textContent = "Password Matched";
      message.classList.add("valid");
      document.getElementById("register").disabled = false;
    } else {
      message.textContent = "Password MisMatch";
      message.classList.remove("valid");
      document.getElementById("register").disabled = true;
    }
  } else {
    message.textContent = " ";
  }
});

show.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let password_field =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    console.log(password_field);
    password_field.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    });
  });
});
