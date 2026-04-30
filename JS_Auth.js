const userDatabase = [
    { id: 1, name: "Devon", email: "Devon@gmail.com", password: "Devon", role: "admin" },
    { id: 2, name: "Charmaine", email: "Charmaine@gmail.com", password: "123", role: "user" },
    { id: 3, name: "Cay", email: "Cay@gmail.com", password: "123", role: "user" },
    { id: 4, name: "Tenorio", email: "Tenorio@gmail.com", password: "123", role: "user" },
    { id: 5, name: "Louise", email: "Louise@gmail.com", password: "123", role: "admin" },
    { id: 6, name: "Robbie", email: "Robbie@gmail.com", password: "123", role: "user" },
    { id: 7, name: "Queency", email: "Queency@gmail.com", password: "123", role: "user" },
    { id: 8, name: "Francis", email: "Francis@gmail.com", password: "123", role: "user" },
    { id: 9, name: "Mitch", email: "Mitch@gmail.com", password: "123", role: "user" },
    { id: 10, name: "Symon", email: "Symon@gmail.com", password: "123", role: "user" },
    { id: 11, name: "Jose", email: "Jose@gmail.com", password: "123", role: "user" },
    { id: 12, name: "Kevin", email: "Kevin@gmail.com", password: "123", role: "user" },
    { id: 13, name: "Angela", email: "Angela@gmail.com", password: "123", role: "admin" },
    { id: 14, name: "Ethan", email: "Ethan@gmail.com", password: "123", role: "user" },
    { id: 15, name: "Kalix", email: "Kalix@gmail.com", password: "123", role: "user" },
    { id: 16, name: "Peter", email: "peter@gmail.com", password: "123", role: "user" },
    { id: 17, name: "Quinn", email: "quinn@gmail.com", password: "123", role: "user" },
    { id: 18, name: "Riley", email: "riley@gmail.com", password: "123", role: "user" },
    { id: 19, name: "Steven", email: "steven@gmail.com", password: "123", role: "user" },
    { id: 20, name: "Tina", email: "tina@gmail.com", password: "123", role: "admin" }
];


function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    loginForm.classList.toggle('hidden');
    registerForm.classList.toggle('hidden');
}

function handleAuth(event, type) {
    event.preventDefault();
    
    if (type === 'login') {
        const email = document.getElementById('login-email').value;
       
        console.log("Logging in...", email);
        alert("Login successful! Redirecting to Learning Center...");
        window.location.href = 'index.html';
    } else {
        const name = document.getElementById('reg-name').value;
        console.log("Registering...", name);
        alert("Account created successfully! Please login.");
        toggleAuth();
    }
}

function handleAuth(event, type) {
    event.preventDefault();
    
    if (type === 'login') {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value; 

        const user = userDatabase.find(u => u.email === email && u.password === password);

        if (user) {
            console.log("Login successful:", user.name);
            alert(`Welcome back, ${user.name}! Redirecting...`);
            
            // Optional: Store user info in localStorage for other pages to use
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            window.location.href = 'index.html';
        } else {
            alert("Invalid email or password. Please try again.");
        }

    } else if (type === 'register') {
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        // Check if user already exists
        const exists = userDatabase.some(u => u.email === email);
        
        if (exists) {
            alert("This email is already registered.");
        } else {
            // Push new user to the local array
            const newUser = {
                id: userDatabase.length + 1,
                name: name,
                email: email,
                password: password,
                role: "student"
            };
            userDatabase.push(newUser);
            
            alert("Account created successfully! Please login.");
            toggleAuth();
        }
    }
}

function togglePasswordVisibility(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleBtn = event.currentTarget; // Gets the button that was clicked

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        toggleBtn.textContent = "Show";
    }
}
// Your existing login/register code + this addition at the END:
document.addEventListener('DOMContentLoaded', function() {
    // After successful login, store user data
    // The login function already does: localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Auto-redirect if already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'index.html';
    }
});
