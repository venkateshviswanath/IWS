// script.js

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupSubmit);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }

    function handleSignupSubmit(event) {
        event.preventDefault();

        const formData = new FormData(signupForm);
        const data = {
            firstName: formData.get('signupFirstName'),
            lastName: formData.get('signupLastName'),
            sex: formData.get('signupSex'),
            dateOfBirth: formData.get('signupDOB'),
            address: formData.get('signupAddress'),
            email: formData.get('signupEmail'),
            password: formData.get('signupPassword'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Check if passwords match
        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Send data to backend for signup
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // Handle success or display a message to the user
        })
        .catch(error => console.error('Error:', error));
    }

    function handleLoginSubmit(event) {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const data = {
            email: formData.get('loginEmail'),
            password: formData.get('loginPassword')
        };

        // Send data to backend for login
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // Handle success or display a message to the user
        })
        .catch(error => console.error('Error:', error));
    }
});
