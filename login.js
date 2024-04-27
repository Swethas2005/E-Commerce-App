const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = {
        email: email,
        password: password
    };

    fetch("http://localhost:3000/users")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(users => {
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            alert("Login successful");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }
    })
    .catch(error => {
        console.error("Error logging in:", error);
        alert("Login failed. Please try again later.");
    });
}
