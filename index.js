// JavaScript code for login and registration functionality

function login(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  var name = document.getElementById('Name').value;
  var password = document.getElementById('password').value;

  // Send login request to the API
  var url = 'http://localhost:3000/users'; 
  // Make a GET request to the users API endpoint
  fetch(url)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(function(users) {
      var authenticatedUser = users.find(function(user) {
        return user.name === name && user.password === password;
      });

      if (authenticatedUser) {
        // Redirect to the next page
        window.location.href = 'dashboard.html';
        alert('WELCOME TO MEDICAL MEDICAL MEDICAREHUB...');
      } else {
        alert('Invalid login credentials. Please try again.');
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
}

function signup(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  var name = document.getElementById('signupName').value;
  var email = document.getElementById('signupEmail').value;
  var password = document.getElementById('signupPassword').value;

  // Send registration request to the API
  var url = 'http://localhost:3000/users'; // Replace with the actual API endpoint for signup
  var data = {
    name: name,
    email: email,
    password: password
  };

  // Make a POST request to the users API endpoint
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (response.ok) {
        alert('Registration successful. You can now login.');
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .catch(function(error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
}

// Add event listeners to the login and signup forms
var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);

var signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', signup);