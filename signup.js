const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const userData = {
        name: username,
        email: email,
        password: password
    };

    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Signup failed");
        }
        alert("Signup successful");
        window.location.href = "login.html";

    })
    .catch(error => {
        console.error("Error signing up:", error);
        alert("Signup failed. Please try again later.");
    });
}
