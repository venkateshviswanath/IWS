// script.js

function submitForm() {
  var form = document.getElementById("userForm");
  var displayInfo = document.getElementById("displayInfo");
  var welcomeMessage = document.getElementById("welcome-message");

  // Create an object to store form data
  var formData = {};

  // Loop through form elements and populate the formData object
  for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    if (element.type !== "button") {
      formData[element.name] = element.value;
    }
  }

  // Hide the welcome message
  welcomeMessage.style.display = "none";

  // Define sections with their corresponding fields
  var sections = [
    { name: "Personal Information", fields: ["firstName", "lastName", "sex", "dob", "streetAddress", "city", "state", "zipCode", "country"] },
    { name: "Education Information", fields: ["university", "qualification", "certification", "skills"] },
    { name: "Portfolio", fields: ["aboutMe", "workExperience", "otherInfo"] },
    { name: "Uploads", fields: ["resume", "picture"] }
  ];

  // Display form data in the displayInfo element
  displayInfo.innerHTML = "<h2>User Information</h2>";

  // Loop through sections and display each section with headings
  sections.forEach(function (section) {
    displayInfo.innerHTML += "<div class='section-heading'>" + section.name + "</div>";
    displayInfo.innerHTML += "<div class='section'>";
    section.fields.forEach(function (field) {
      if (field === "picture") {
        // Display the image for the "picture" field
        displayInfo.innerHTML += "<p><strong>" + field + ":</strong></p>";
        var pic=document.getElementById('picture').value;
        console.log(pic);
        displayInfo.innerHTML += "<img id='display-picture' alt='User Picture'"+'src='+pic+" style='max-width: 100%; height: auto;'><br><br>";

      } else if (field === "resume") {
        // Display "View Resume" link for the "resume" field
        var res=document.getElementById('resume').value;
        displayInfo.innerHTML += "<p><strong>" + field + ":</strong> <a href='#' onclick='viewResume(\"" + res + "\"); return false;'>View Resume</a></p>";
      } else {
        displayInfo.innerHTML += "<p><strong>" + field + ":</strong> " + formData[field] + "</p>";
      }
    });
    displayInfo.innerHTML += "</div>";
  });

  // Show the displayInfo element and hide the form
  displayInfo.style.display = "block";
  form.style.display = "none";

  // Create the "OK" button dynamically
  var okButton = document.createElement("button");
  okButton.type = "button";
  okButton.innerHTML = "OK";
  okButton.onclick = function () {
    // Call the okButton function
    okButtonFunction();
  };

  // Append the "OK" button to the displayInfo element
  displayInfo.appendChild(okButton);
}

function okButtonFunction() {
  var form = document.getElementById("userForm");
  var displayInfo = document.getElementById("displayInfo");
  var welcomeMessage = document.getElementById("welcome-message");

  // Clear form fields
  form.reset();

  // Show the welcome message
  welcomeMessage.style.display = "block";

  // Hide the displayInfo element and show the form
  displayInfo.style.display = "none";
  form.style.display = "block";
}



// Function to open the resume in a new tab
function viewResume(resumePath) {
  // Replace 'resume.pdf' with the actual file path or URL
  window.open(resumePath, '_blank');
}
