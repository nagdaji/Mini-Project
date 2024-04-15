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

//adding the new date field
function addField() {
  var formContainer = document.getElementById("key-dates-insert");
  var newField = document.createElement("div");
  newField.className = "input-box view1";
  newField.innerHTML =
    `
    <input name="date[]" type="date" class="view1" placeholder="Date" />
    <input name="description[]" type="text" class="view1" placeholder="Description" />
    <button class="remove-btn btn view1" onclick="removeField(this)">Remove</button>
    `;
  formContainer.appendChild(newField);
}

//deleting the existing date field
function removeField(btn) {
  var formContainer = document.getElementById("key-dates-insert");
  formContainer.removeChild(btn.parentNode);
}

//adding the new speaker
function addSpeaker() {
  var formContainer = document.getElementById("speaker-list");
  var newField = document.createElement("div");
  newField.className = "each-speaker";
  newField.innerHTML = `<div class="input-box">
    <label for="speaker-name">Speaker Name:</label>
    <label for="images">Speaker Images</label>
  </div>
  <div class="input-box">
    <input name="speakername[]" type="text" placeholder="Speaker Name" />
    <input type="file" name="speakerimages" multiple />
  </div>
  <div class="input-box">
    <label for="venue-description">Speaker Occupation</label>
  </div>
  <div class="input-box">
    <input name="speakeroccupation[]" type="text" placeholder="Speaker Occupation" />
  </div>
  <button class="remove-btn btn" onclick="removeSpeaker(this)">
    Remove speaker
  </button>`;
  formContainer.appendChild(newField);
}

//deleting the existing speaker
function removeSpeaker(btn) {
  var formContainer = document.getElementById("speaker-list");
  formContainer.removeChild(btn.parentNode);
}

var create = document.getElementById("create-event-submission");
create.addEventListener("click", () => {
  const doc = document.querySelectorAll("input");
  console.log(doc);
  const values = {};
  doc.forEach((input) => {
    values[input.name] = input.value;
  });
});

//adding the new committee member
function addCommitteeMember(ele) {
  //   console.log(ele.parentNode.childnode);
  var siblings = Array.from(ele.parentNode.childNodes).filter(
    (child) => child.nodeType === 1 && child !== ele
  );

  var newField = document.createElement("div");
  newField.className = "each-user";
  newField.innerHTML = `<div class="input-box">
  <label for="user-name">Member Name:</label>
  <label for="images">Member Images</label>
</div>
<div class="input-box">
  <input name = "membername" type="text" placeholder="Member Name" />
  <input type="file" name="memberimages" />
</div>
<div class="input-box view">
  <label for="facebool">Facebook:</label>
  <label for="facebool">Twitter:</label>
  <label for="facebool">LinkedIn:</label>
</div>
<div class="input-box view">
  <input name="facebooklink" type="text" placeholder="Facebook" />
  <input name="twitterlink" type="text" placeholder="Twitter" />
  <input name="linkedinlink" type="text" placeholder="LinkedIn" />
</div>
<button
  class="remove-btn btn"
  onclick="removeCommitteeMember(this)"
>
  Remove User
</button>`;
  siblings[2].appendChild(newField);
}

//deleting the existing date field
function removeCommitteeMember(btn) {
  btn.parentNode.parentNode.removeChild(btn.parentNode);
}

//adding a new committee with one memeber
function addCommittee() {
  var formContainer = document.getElementById("committee-list");
  var newField = document.createElement("div");
  newField.className = "each-committee";
  newField.innerHTML = `<div class="input-box">
  <label for="committee-name">Committee Name:</label>
</div>
<div class="input-box">
  <input name="committeename" type="text" placeholder="Committee Name" />
</div>
<div class="committee-member-list" id="committee-member-list">
  <div class="each-user">
    <div class="input-box">
      <label for="user-name">Member Name:</label>
      <label for="images">Member Images</label>
    </div>
    <div class="input-box">
      <input name="membername" type="text" placeholder="Member Name" />
      <input type="file" name="memberimages" />
    </div>
    <div class="input-box view">
      <label for="facebool">Facebook:</label>
      <label for="facebool">Twitter:</label>
      <label for="facebool">LinkedIn:</label>
    </div>
    <div class="input-box view">
      <input name="facebooklink" type="text" placeholder="Facebook" />
      <input name="twitterlink" type="text" placeholder="Twitter" />
      <input name="linkedinlink" type="text" placeholder="LinkedIn" />
    </div>
    <button
      class="remove-btn btn"
      onclick="removeCommitteeMember(this)"
    >
      Remove User
    </button>
  </div>
</div>
<button class="add-btn btn" onclick="addCommitteeMember(this); return false;">
  Add User</button
><br />
<button
  class="remove-btn btn"
  onclick="removeCommittee(this)"
>
  Remove Committee
</button>`;
  formContainer.appendChild(newField);
}

//deleting the existing committee
function removeCommittee(btn) {
  var formContainer = document.getElementById("committee-list");
  formContainer.removeChild(btn.parentNode);
}

//adding the new sponser to the list
function addSponser() {
  var formContainer = document.getElementById("sponsers-list");
  var newField = document.createElement("div");
  newField.className = "each-sponser";
  newField.innerHTML = `<div class="input-box">
      <label for="Sponser-name">Sponser Name:</label>
      <label for="images">Sponser Images</label>
    </div>
    <div class="input-box">
      <input name="sponsername[]" type="text" placeholder="Sponser Name" />
      <input type="file" name="sponserimage" multiple />
    </div>
    <button
      class="remove-btn btn"
      onclick="removeSponser(this)"
    >
      Remove Sponser
    </button>`;
  formContainer.appendChild(newField);
}

//deleting the existing sponsors information
function removeSponser(btn) {
  var formContainer = document.getElementById("sponsers-list");
  formContainer.removeChild(btn.parentNode);
}

//adding the new headquarters details
function addquarters() {
  var formContainer = document.getElementById("quarter-list");
  var newField = document.createElement("div");
  newField.className = "each-headquarter";
  newField.innerHTML = `<div class="input-box">
    <label for="headquarters-name">Headquarter Name:</label>
    <label for="headquarters-link">Headquarter link:</label>
  </div>
  <div class="input-box">
    <input name="headquartername[]" type="text" placeholder="Headquarter Name" />
    <input name="headquarterlink[]" type="text" placeholder="Headquarter Link" />
    <button
      class="remove-btn btn"
      onclick="removequarters(this)"
    >
      Remove Headquarter
    </button>`;
  formContainer.appendChild(newField);
}

//deleting the existing date field
function removequarters(btn) {
  //   console.log(btn.parentNode.parentNode);
  var formContainer = document.getElementById("quarter-list");
  formContainer.removeChild(btn.parentNode.parentNode);
}

//adding the new contact details
function addcontact() {
  var formContainer = document.getElementById("contact-list");
  var newField = document.createElement("div");
  newField.className = "each-contact";
  newField.innerHTML = `<div class="input-box">
    <label for="mobile-number">Mobile Number:</label>
    <label for="email">Email:</label>
  </div>
  <div class="input-box">
    <input name="mobilenumber[]" type="tel" placeholder="Mobile Number" />
    <input name="email[]" type="email" placeholder="Email id" />
    <button
      class="remove-btn btn"
      onclick="removeContact(this)"
    >
      Remove Contact
    </button>`;
  formContainer.appendChild(newField);
}

//deleting the existing date field
function removeContact(btn) {
  var formContainer = document.getElementById("contact-list");
  formContainer.removeChild(btn.parentNode.parentNode);
}

function fetchData() {
  var committeeContainers = document.querySelectorAll(".each-committee");
  // console.log(committeeContainers.length);
  var data = [];

  // console.log(typeof committeeContainers);
  // console.log(committeeContainers.length);

  // committeeContainers.forEach((val) => console.log(val));

  // Iterate through each committee container
  committeeContainers.forEach(function (committeeContainer) {
    var committeeNameInput = committeeContainer.querySelector(
      "input[name='committee-name']"
    );
    if (committeeNameInput) {
      var committeeName = committeeNameInput.value;
      var members = [];

      // Iterate through each member container within the committee
      var memberContainers = committeeContainer.querySelectorAll(".each-user");
      // console.log(memberContainers.length);
      memberContainers.forEach(function (memberContainer) {
        var memberNameInput = memberContainer.querySelector(
          "input[name='member-name']"
        );
        if (memberNameInput) {
          var memberName = memberNameInput.value;
          var memberImagesInput = memberContainer.querySelector(
            "input[name='member-images']"
          );
          var memberImages = memberImagesInput ? memberImagesInput.value : "";
          var facebookLinkInput = memberContainer.querySelector(
            "input[name='facebook-link']"
          );
          var facebookLink = facebookLinkInput ? facebookLinkInput.value : "";
          var twitterLinkInput = memberContainer.querySelector(
            "input[name='twitter-link']"
          );
          var twitterLink = twitterLinkInput ? twitterLinkInput.value : "";
          var linkedinLinkInput = memberContainer.querySelector(
            "input[name='linkedin-link']"
          );
          var linkedinLink = linkedinLinkInput ? linkedinLinkInput.value : "";

          // Push member data to the members array
          // members.push({
          //   name: memberName,
          //   images: memberImages,
          //   facebook: facebookLink,
          //   twitter: twitterLink,
          //   linkedin: linkedinLink,
          // });
          console.log(memberName);

          const temp = {
            name: memberName,
            images: memberImages,
            facebook: facebookLink,
            twitter: twitterLink,
            linkedin: linkedinLink,
          };
          members.push(temp);
          console.log(temp);
          console.log(members.length);
        }
      });
      // console.log(members.length);
      // console.log(members);
      // Push committee data to the data array only if members are present
      if (members.length > 0) {
        data.push({
          committeeNam: committeeName,
          member: members,
        });
      }
    }
  });

  console.log(data); // Output the fetched data
}