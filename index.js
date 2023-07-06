// User login functionality
function loginUser(email, password) {
  const loginData = {
    email: email,
    password: password
  };

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Login successful:", data);
      // Redirect the user to the dashboard page
      window.location.href = "dashboard.html"; // Replace "dashboard.html" with your desired URL
    })
    .catch(error => {
      console.error("Login failed:", error);
    });
}

// User signup functionality
function signupUser(name, email, password) {
  const signupData = {
    name: name,
    email: email,
    password: password
  };

  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signupData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Signup successful:", data);
      // Redirect the user to the login page
      window.location.href = "login.html"; // Replace "login.html" with your desired URL
    })
    .catch(error => {
      console.error("Signup failed:", error);
    });
}

// Example usage
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");

loginButton.addEventListener("click", () => {
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  loginUser(email, password);
});

signupButton.addEventListener("click", () => {
  const name = document.getElementById("name-input").value;
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  signupUser(name, email, password);
});
