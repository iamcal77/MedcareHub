// Function to handle login
function handleLogin(event) {
  event.preventDefault();

  const nameInput = document.querySelector('#Name');
  const passwordInput = document.querySelector('#password');

  const name = nameInput.value;
  const password = passwordInput.value;

  // Perform login validation
  const user = validateLogin(name, password);

  if (user) {
    // Handle successful login
    alert('Login successful!');
    // Redirect the user to the dashboard page
    window.location.href = 'dashboard.html';
  } else {
    // Handle login error
    alert('Login failed. Please check your credentials.');
    // You can display an error message or perform additional actions here
  }

  // Clear the input fields
  nameInput.value = '';
  passwordInput.value = '';
}

// Function to validate login
function validateLogin(name, password) {
  // Assuming the user data is stored in the 'users' array in db.json
  const users = [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "password": "qwerty456"
    }
  ];

  // Find the user with matching name and password
  const user = users.find(u => u.name === name && u.password === password);

  return user;
}

// Event listener for login form submission
const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', handleLogin);
