// Assuming you have functions for API requests and handling responses
function apiRequest(url, method, data, callback) {
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => console.error('Error:', error));
}

function displayWelcomeMessage(userName) {
    alert(`Welcome, ${userName}!`);
    // You can also update the DOM to display the welcome message in a more user-friendly way
}

function validateEmail(email) {
    // Check if the email matches the format firstname_lastname@student.uml.edu
    const emailRegex = /^[a-zA-Z]+_[a-zA-Z]+@student.uml.edu$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Check if the password meets security constraints
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email)) {
        alert('Invalid email format. Use firstname_lastname@student.uml.edu');
        return;
    }

    apiRequest('/signin', 'POST', { email, password }, (response) => {
        if (response.status === 200) {
            displayWelcomeMessage(response.user.name);
            // Redirect or perform other actions after successful sign-in
        } else if (response.status === 401) {
            alert('Invalid email or password');
        } else {
            alert('Sign in failed. Please try again.');
        }
    });
}

function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validateEmail(email)) {
        alert('Invalid email format. Use firstname_lastname@student.uml.edu');
        return;
    }

    if (!validatePassword(password)) {
        alert('Invalid password format. Minimum 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character');
        return;
    }

    apiRequest('/signup', 'POST', { email, password }, (response) => {
        if (response.status === 201) {
            displayWelcomeMessage(response.user.name);
            // Redirect or perform other actions after successful sign-up
        } else {
            alert('Sign up failed. Please try again.');
        }
    });
}

function guestLogin() {
    apiRequest('/guestlogin', 'POST', {}, (response) => {
        if (response.status === 200) {
            displayWelcomeMessage(response.user.name);
            // Redirect or perform other actions after successful guest login
        } else {
            alert('Guest login failed. Please try again.');
        }
    });
}
