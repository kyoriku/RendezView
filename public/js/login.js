// Asynchronous function to handle login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get user input values and error message element
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  const errorMessageElement = document.getElementById('login-error-message');

  if (email && password) { // Check if email and password are provided
    showLoadingSpinner('login-spinner'); // Show the loading spinner

    try {
      // Make a POST request to the login API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile'); // Redirect to the profile page on successful login
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        displayErrorMessage(errorMessageElement, errorMessage); // Display the error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      displayErrorMessage(errorMessageElement, 'An unexpected error occurred.');
    } finally {
      hideLoadingSpinner('login-spinner'); // Hide the loading spinner, regardless of success or failure
    }
  }
};

// Similar function to handle signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get user input values and error message element
  const username = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const errorMessageElement = document.getElementById('signup-error-message');

  if (username && email && password) { // Check if all required fields are provided
    showLoadingSpinner('signup-spinner'); // Show the loading spinner

    try {
      // Make a POST request to the signup API endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/profile'); // Redirect to the profile page on successful signup
      } else {
        const errorMessage = await response.text(); // Get the error message from the response
        displayErrorMessage(errorMessageElement, errorMessage); // Display the error message
      }
    } catch (error) {
      console.error('Error during signup:', error);
      displayErrorMessage(errorMessageElement, 'An unexpected error occurred.');
    } finally {
      hideLoadingSpinner('signup-spinner'); // Hide the loading spinner, regardless of success or failure
    }
  }
};

// Add event listeners to login and signup forms
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// Function to show loading spinner
const showLoadingSpinner = (spinnerId) => {
  const spinner = document.getElementById(spinnerId);
  if (spinner) {
    spinner.style.display = 'inline-block'; // Display the spinner
  }
};

// Function to hide loading spinner
const hideLoadingSpinner = (spinnerId) => {
  const spinner = document.getElementById(spinnerId);
  if (spinner) {
    spinner.style.display = 'none'; // Hide the spinner
  }
};

// Function to display an error message
const displayErrorMessage = (element, message) => {
  try {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.errors && Array.isArray(parsedMessage.errors)) {
      // Map Sequelize validation errors to user-friendly messages
      const userFriendlyMessages = parsedMessage.errors.map(error => {
        if (error.validatorKey === 'isEmail') {
          return 'Invalid email address';
        } else if (error.validatorKey === 'len' && error.path === 'password') {
          return 'Password must be at least 8 characters long';
        } else {
          return 'Validation error: ' + error.message;
        }
      });

      element.textContent = userFriendlyMessages.join(', '); // Display user-friendly error messages
    } else if (parsedMessage.message) {
      // Display the error message if it exists
      element.textContent = parsedMessage.message;
    } else {
      // Display a generic error message if none of the above conditions match
      element.textContent = 'An unexpected error occurred.';
    }
  } catch (error) {
    // If parsing fails, display the original message
    element.textContent = message;
  }

  element.style.color = 'red'; // Set the text color to red
  element.style.display = 'block'; // Display the error message element
  element.style.background = 'black';
};