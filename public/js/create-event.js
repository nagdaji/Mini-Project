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
  newField.innerHTML = `
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
  // console.log(doc);
  const values = {};

  doc.forEach((input) => {
    values[input.name] = input.value;
  });
});

//adding the new committee member
// function addCommitteeMember(ele) {
//   //   console.log(ele.parentNode.childnode);
//   var siblings = Array.from(ele.parentNode.childNodes).filter(
//     (child) => child.nodeType === 1 && child !== ele
//   );
//   // console.log();
//   var newField = document.createElement("div");
//   newField.className = "each-user";
//   newField.innerHTML = `<div class="input-box">
//   <label for="user-name">Member Name:</label>
//   <label for="images">Member Images</label>
// </div>
// <div class="input-box">
//   <input name = "membername" type="text" placeholder="Member Name" />
//   <input type="file" name="memberimages" />
// </div>
// <div class="input-box view">
//   <label for="facebool">Facebook:</label>
//   <label for="facebool">Twitter:</label>
//   <label for="facebool">LinkedIn:</label>
// </div>
// <div class="input-box view">
//   <input name="facebooklink" type="text" placeholder="Facebook" />
//   <input name="twitterlink" type="text" placeholder="Twitter" />
//   <input name="linkedinlink" type="text" placeholder="LinkedIn" />
// </div>
// <button
//   class="remove-btn btn"
//   onclick="removeCommitteeMember(this)"
// >
//   Remove User
// </button>`;
//   siblings[2].appendChild(newField);
// }

// //deleting the existing date field
// function removeCommitteeMember(btn) {
//   btn.parentNode.parentNode.removeChild(btn.parentNode);
// }

//adding a new committee with zero memeber
function addCommittee() {
  var formContainer = document.getElementById("committee-list");
  var newField = document.createElement("div");
  newField.className = "each-committee";
  newField.innerHTML = `<div class="input-box">
  <label for="committee-name">Committee Name:</label>
  <label for="committee-member">Number of Members:</label>
</div>
<div class="input-box">
  <input name="committeename" type="text" placeholder="Committee Name" />
  
  <input name="noofmembers" type="number" id="numMembers" min="1" value="1" placeholder="Number of Members" onkeydown="addMemberFields(this)"
  onkeyup="addMemberFields(this)"/>
</div>
<div class="committee-member-list" id="committee-member-list">
  
</div>
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

//function for appending committee members according to the user needs
//adding or appending the new members all at one time according to the user needs
function addMemberFields(ele) {
  var siblings = ele.parentNode.parentNode.childNodes[4];
  // console.log(siblings);
  siblings.innerHTML = `  `;
  for (let i = 0; i < ele.value; i++) {
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
  </div>`;
    siblings.appendChild(newField);
  }
}

//adding a new advisory committee with zero memeber
function addAdvisory() {
  var formContainer = document.getElementById("advisory-list");
  var newField = document.createElement("div");
  newField.className = "each-advisory";
  newField.innerHTML = `<div class="input-box">
  <label for="advisory-name">Advisory Committee Name:</label>
  <label for="Advisory-member">Number of Members:</label>
</div>
<div class="input-box">
  <input name="advisoryname" type="text" placeholder="Committee Name" />
  
  <input name="noofadvisory" type="number"  min="1" value="1" placeholder="Number of Members" onkeydown="addAdvisoryFields(this)"
  onkeyup="addAdvisoryFields(this)"/>
</div>
<div class="advisory-member-list" id="advisory-member-list">
  
</div>
<button
  class="remove-btn btn"
  onclick="removeAdvisory(this)"
>
  Remove Advisory Committee
</button>`;
  formContainer.appendChild(newField);
}

//deleting the existing committee
function removeAdvisory(btn) {
  var formContainer = document.getElementById("advisory-list");
  formContainer.removeChild(btn.parentNode);
}

//function for appending committee members according to the user needs
//adding or appending the new members all at one time according to the user needs
function addAdvisoryFields(ele) {
  var siblings = ele.parentNode.parentNode.childNodes[4];
  // console.log(siblings);
  siblings.innerHTML = `  `;
  for (let i = 0; i < ele.value; i++) {
    var newField = document.createElement("div");
    newField.className = "each-advisory-member";
    newField.innerHTML = `<div class="input-box">
    <label for="user-name">Member Name:</label>
    <label for="images">Member Images</label>
  </div>
  <div class="input-box">
    <input name = "advisorymembername" type="text" placeholder="Member Name" />
    <input type="file" name="advisorymemberimages" />
  </div>
  <div class="input-box view">
    <label for="facebool">Facebook:</label>
    <label for="facebool">Twitter:</label>
    <label for="facebool">LinkedIn:</label>
  </div>
  <div class="input-box view">
    <input name="advisoryfacebooklink" type="text" placeholder="Facebook" />
    <input name="advisorytwitterlink" type="text" placeholder="Twitter" />
    <input name="advisorylinkedinlink" type="text" placeholder="LinkedIn" />
  </div>`;
    siblings.appendChild(newField);
  }
}

//adding a new technical committee with zero memeber
function addTechnical() {
  var formContainer = document.getElementById("technical-list");
  var newField = document.createElement("div");
  newField.className = "each-technical";
  newField.innerHTML = `<div class="input-box">
  <label for="technical-name">Technical Committee Name:</label>
  <label for="Technical-member">Number of Members:</label>
</div>
<div class="input-box">
  <input name="technicalname" type="text" placeholder="Committee Name" />
  
  <input name="nooftechnical" type="number"  min="1" value="1" placeholder="Number of Members" onkeydown="addTechnicalFields(this)"
  onkeyup="addTechnicalFields(this)"/>
</div>
<div class="technical-member-list" id="technical-member-list">
  
</div>
<button
  class="remove-btn btn"
  onclick="removeTechnical(this)"
>
  Remove Technical Committee
</button>`;
  formContainer.appendChild(newField);
}

//deleting the existing committee
function removeTechnical(btn) {
  var formContainer = document.getElementById("technical-list");
  formContainer.removeChild(btn.parentNode);
}

//function for appending committee members according to the user needs
//adding or appending the new members all at one time according to the user needs
function addTechnicalFields(ele) {
  var siblings = ele.parentNode.parentNode.childNodes[4];
  // console.log(siblings);
  siblings.innerHTML = `  `;
  for (let i = 0; i < ele.value; i++) {
    var newField = document.createElement("div");
    newField.className = "each-technical-member";
    newField.innerHTML = `<div class="input-box">
    <label for="user-name">Member Name:</label>
    <label for="images">Member Images</label>
  </div>
  <div class="input-box">
    <input name = "technicalmembername" type="text" placeholder="Member Name" />
    <input type="file" name="technicalmemberimages" />
  </div>
  <div class="input-box view">
    <label for="facebool">Facebook:</label>
    <label for="facebool">Twitter:</label>
    <label for="facebool">LinkedIn:</label>
  </div>
  <div class="input-box view">
    <input name="technicalfacebooklink" type="text" placeholder="Facebook" />
    <input name="technicaltwitterlink" type="text" placeholder="Twitter" />
    <input name="technicallinkedinlink" type="text" placeholder="LinkedIn" />
  </div>`;
    siblings.appendChild(newField);
  }
}

//adding a new committee with zero memeber
function addTracks() {
  var formContainer = document.getElementById("tracks-list");
  var newField = document.createElement("div");
  newField.className = "each-tracks";
  newField.innerHTML = `<div class="input-box">
  <label for="tracks-name">Tracks Name:</label>
  <label for="tracks-member">Number of Members:</label>
</div>
<div class="input-box">
  <input name="tracksname" type="text" placeholder="Tracks Name" />
  
  <input name="nooftracks" type="number"  min="1" value="1" placeholder="Number of Members" onkeydown="addTracksFields(this)"
  onkeyup="addTracksFields(this)"/>
</div>
<div class="tracks-member-list" id="tracks-member-list">
  
</div>
<button
  class="remove-btn btn"
  onclick="removeTracks(this)"
>
  Remove Tracks
</button>`;
  formContainer.appendChild(newField);
}

//deleting the existing committee
function removeTracks(btn) {
  var formContainer = document.getElementById("tracks-list");
  formContainer.removeChild(btn.parentNode);
}

//function for appending committee members according to the user needs
//adding or appending the new members all at one time according to the user needs
function addTracksFields(ele) {
  var siblings = ele.parentNode.parentNode.childNodes[4];
  // console.log(siblings);
  siblings.innerHTML = `  `;
  for (let i = 0; i < ele.value; i++) {
    var newField = document.createElement("div");
    newField.className = "each-tracks-member";
    newField.innerHTML = `<div class="input-box">
    <label for="user-name">Member Name:</label>
    <label for="images">Member Images</label>
  </div>
  <div class="input-box">
    <input name = "tracksmembername" type="text" placeholder="Member Name" />
    <input type="file" name="tracksmemberimages" />
  </div>
  <div class="input-box view">
    <label for="facebool">Facebook:</label>
    <label for="facebool">Twitter:</label>
    <label for="facebool">LinkedIn:</label>
  </div>
  <div class="input-box view">
    <input name="tracksfacebooklink" type="text" placeholder="Facebook" />
    <input name="trackstwitterlink" type="text" placeholder="Twitter" />
    <input name="trackslinkedinlink" type="text" placeholder="LinkedIn" />
  </div>`;
    siblings.appendChild(newField);
  }
}
//adding a new committee with zero memeber
function addTrack() {
  var formContainer = document.getElementById("track-list");
  var newField = document.createElement("div");
  newField.className = "each-track";
  newField.innerHTML = `<div class="input-box">
  <label for="track-name">Track Name:</label>
  <label for="track-member">Number of Members:</label>
</div>
<div class="input-box">
  <input name="trackname" type="text" placeholder="Track Name" />
  
  <input name="nooftrack" type="number"  min="1" value="1" placeholder="Number of Members" onkeydown="addTrackFields(this)"
  onkeyup="addTrackFields(this)"/>
</div>
<div class="track-member-list" id="track-member-list">
  
</div>
<button
  class="remove-btn btn"
  onclick="removeTrack(this)"
>
  Remove Track
</button>`;
  formContainer.appendChild(newField);
}

//deleting the existing committee
function removeTrack(btn) {
  var formContainer = document.getElementById("track-list");
  formContainer.removeChild(btn.parentNode);
}

//function for appending committee members according to the user needs
//adding or appending the new members all at one time according to the user needs
function addTrackFields(ele) {
  var siblings = ele.parentNode.parentNode.childNodes[4];
  // console.log(siblings);
  siblings.innerHTML = `  `;
  for (let i = 0; i < ele.value; i++) {
    var newField = document.createElement("div");
    newField.className = "each-track-member";
    newField.innerHTML = `<div class="input-box">
    <label for="user-name">Sub Track Name:</label>
  </div>
  <div class="input-box">
    <input name = "subtrackname" type="text" placeholder="Sub Tracks" />
  </div>`;
    siblings.appendChild(newField);
  }
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
