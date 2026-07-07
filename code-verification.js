document.addEventListener('DOMContentLoaded', function () {
    // Get the user's email from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    // Display the user's email on the page
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement && email) {
        userEmailElement.textContent = email;
    }

    // Handle form submission
    const codeForm = document.getElementById('code-form');
    if (codeForm) {
        codeForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission

            // Get the entered code
            const code = document.getElementById('code').value;

            // Validate the code (you can add your own validation logic here)
            if (code.length === 6) { // Example: Check if the code is 6 digits
                alert('Code verified successfully!');
                // Redirect to the dashboard or another page
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid code. Please enter a 6-digit code.');
            }
        });
    }
});