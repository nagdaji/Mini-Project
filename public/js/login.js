const forms = document.querySelector(".forms"),
  show = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");

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
