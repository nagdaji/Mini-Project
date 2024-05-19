
let conf;
let otpGen;
let username;
let timer;
let secondsRemaining = 300;
async function OTPFn() {
  const btn = document.getElementById("generateBtn");
  btn.disabled = false;
  clearFn();
  otpGen = Math.floor(1000 + Math.random() * 9000);
  const temp = document.getElementById("content");
  const showOtp = document.createElement("div");
  showOtp.classList.add("otp-display");
  temp.appendChild(showOtp);
  document.getElementById("otpForm").style.display = "flex";
  console.log(otpGen);
  startTimer();
  username = document.getElementById("email").value;
  conf = document.getElementById("conf").value;
  await sendOTPToBackend(otpGen,username);
}

// send otp to backend
function sendOTPToBackend(otp,username) {
  fetch('/otp/'+conf, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ otp , username})
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send OTP to backend');
    }
    console.log('OTP sent to backend successfully');
  })
  .catch(error => {
    console.error('Error sending OTP to backend:', error.message);
  });
}
/////////////////////////////////

function clearFn() {
  const prevOtp = document.querySelector(".otp-display");
  if (prevOtp) {
    prevOtp.remove();
  }
  resetTimer();
  document.getElementById("errorMessage").innerText = "";
  enableInputField();
}
function OTPVerifyFn() {
  const userOtp = document.getElementById("userOTP").value;
  if (userOtp === "") {
    alert("Please enter OTP.");
    return;
  }
  const enterOtp = parseInt(userOtp);
  if (!isNaN(enterOtp)) {
    if (secondsRemaining > 0) {
      if (enterOtp === otpGen) {
        showMsgFn();
        document.getElementById("generateBtn").disabled = false;
        resetTimer();
        enableInputField();

        ///////////////////// otp verified and redirect to signup page
        const url = `/signup1/${conf}?conf=${conf}&username=${username}`;
        window.location.href = url;
        /////////////////////

      } else {
        document.getElementById("errorMessage").innerText =
          "Invalid OTP. Please try again.";
      }
    } else {
      document.getElementById("errorMessage").innerText =
        "OTP Expired. Please generate a new OTP.";
      resetTimer();
    }
  } else {
    alert("Invalid OTP. Please try again.");
  }
}
function showMsgFn() {
  const successMessage = document.getElementById("successMessage");
  successMessage.style.animation = "fadeIn 1s forwards";
  successMessage.style.display = "flex";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}
function startTimer() {
  timer = setInterval(function () {
    if (secondsRemaining <= 0) {
      clearInterval(timer);
      document.getElementById("generateBtn").disabled = false;
      document.getElementById("errorMessage").innerText =
        "OTP Expired. Please generate a new OTP.";
      resetTimer();
      disableInputField();
    } else {
      document.getElementById(
        "timer"
      ).innerText = `Time Remaining: ${secondsRemaining} seconds`;
      secondsRemaining--;
    }
  }, 1000);
}
function resetTimer() {
  clearInterval(timer);
  document.getElementById("timer").innerText = "";
  secondsRemaining = 300;
}
function disableInputField() {
  document.getElementById("userOTP").disabled = true;
}
function enableInputField() {
  document.getElementById("userOTP").disabled = false;
}
function clearFields() {
  document.getElementById("userOTP").value = "";
  clearFn();
}

