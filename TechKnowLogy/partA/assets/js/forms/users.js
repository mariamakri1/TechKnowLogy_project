// Global: one hash function used everywhere
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
                .map(b => b.toString(16).padStart(2, "0"))
                .join("");
}

// Helper: load users object from localStorage (returns {} if none)
function loadUsers() {
    try {
        return JSON.parse(localStorage.getItem("users") || "{}");
    } catch (err) {
        console.error("Failed to parse users from localStorage:", err);
        return {};
    }
}

// Helper: save users object
function saveUsers(usersObj) {
    localStorage.setItem("users", JSON.stringify(usersObj));
    console.log("Saved users to localStorage:", usersObj);
}

// Debug log current users on load
console.log("users.js loaded. current users:", loadUsers());



// ΕΓΓΡΑΦΗ
const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = (document.getElementById("regUsername").value || "").trim();
        const password = document.getElementById("regPassword").value || "";
        const confirm = document.getElementById("confirmPassword") ? document.getElementById("confirmPassword").value : "";

        //JS validation
        if (!username || !password) {
            if (registerMessage) { registerMessage.textContent = "Συμπλήρωσε όλα τα πεδία!"; registerMessage.style.color = "red"; }
            return;
        }
        if (confirm && password !== confirm) {
            if (registerMessage) { registerMessage.textContent = "Οι κωδικοί δεν ταιριάζουν."; registerMessage.style.color = "red"; }
            return;
        }

        // Hash password
        const hash = await hashPassword(password);

        // Load existing users
        let users = loadUsers();

        // If stored previously as simple hash string (backward), convert check
        if (users[username] && typeof users[username] === "string") {
            // user exists as plain hash string -> treat as existing user
            if (registerMessage) { registerMessage.textContent = "Το όνομα χρήστη υπάρχει ήδη!"; registerMessage.style.color = "red"; }
            return;
        }

        if (users[username]) {
            if (registerMessage) { registerMessage.textContent = "Το όνομα χρήστη υπάρχει ήδη!"; registerMessage.style.color = "red"; }
            return;
        }

        // Build full user object (collect additional fields if present)
        const userObj = {
            fullname: (document.getElementById("fullname") ? document.getElementById("fullname").value.trim() : ""),
            email: (document.getElementById("email") ? document.getElementById("email").value.trim() : ""),
            birthdate: (document.getElementById("birthdate") ? document.getElementById("birthdate").value : ""),
            gender: (() => {
                const g = document.querySelector('input[name="gender"]:checked');
                return g ? g.value : "";
            })(),
            interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(i => i.value),
            experience: (document.getElementById("experience") ? document.getElementById("experience").value : ""),
            goal: (document.getElementById("goal") ? document.getElementById("goal").value : ""),
            passwordHash: hash,
            createdAt: new Date().toISOString()
        };

        users[username] = userObj;
        saveUsers(users);

        if (registerMessage) { registerMessage.textContent = "Επιτυχής εγγραφή!"; registerMessage.style.color = "green"; }


        registerForm.reset();
    });
}


// ΣΥΝΔΕΣΗ
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = (document.getElementById("loginUsername").value || "").trim();
        const password = document.getElementById("loginPassword").value || "";

        if (!username || !password) {
            if (loginMessage) { loginMessage.textContent = "Συμπλήρωσε όλα τα πεδία!"; loginMessage.style.color = "red"; }
            return;
        }

        const hashedInput = await hashPassword(password);
        const users = loadUsers();

        console.log("Attempt login for:", username, "hashedInput:", hashedInput);

        const stored = users[username];

        if (!stored) {
            if (loginMessage) { loginMessage.textContent = "Λάθος όνομα χρήστη ή κωδικός."; loginMessage.style.color = "red"; }
            console.warn("Login failed: user not found");
            return;
        }

        // Support both legacy (string hash) and new object format
        if (typeof stored === "string") {
            // legacy stored as hash string
            if (stored === hashedInput) {
                if (loginMessage) { loginMessage.textContent = "Επιτυχής σύνδεση!"; loginMessage.style.color = "green"; }
                localStorage.setItem("loggedInUser", username);
                console.log("Legacy-login success", username);
            } else {
                if (loginMessage) { loginMessage.textContent = "Λάθος όνομα χρήστη ή κωδικός."; loginMessage.style.color = "red"; }
                console.warn("Legacy-login failed: hash mismatch");
            }
        } else if (typeof stored === "object" && stored.passwordHash) {
            if (stored.passwordHash === hashedInput) {
                if (loginMessage) { loginMessage.textContent = "Επιτυχής σύνδεση!"; loginMessage.style.color = "green"; }
                localStorage.setItem("loggedInUser", username);
                console.log("Login success", username);
            } else {
                if (loginMessage) { loginMessage.textContent = "Λάθος όνομα χρήστη ή κωδικός."; loginMessage.style.color = "red"; }
                console.warn("Login failed: passwordHash mismatch", { storedHash: stored.passwordHash });
            }
        } else {
            if (loginMessage) { loginMessage.textContent = "Λάθος όνομα χρήστη ή κωδικός."; loginMessage.style.color = "red"; }
            console.error("Unknown stored user format for", username, stored);
        }

        // clear password field
        const pwdField = document.getElementById("loginPassword");
        if (pwdField) pwdField.value = "";
    });
}

