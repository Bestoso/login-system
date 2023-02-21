const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');

function validateForm (){
    const regExps = {
        email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    }
    
    if (!regExps.email.test(email.value)) {
        Toastify({
            text: "Please enter a valid email",
            duration: 3000,
            newWindow: true,
            gravity: "top", 
            position: 'right', 
            backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
            stopOnFocus: true, 
            onClick: function(){} 
        }).showToast();
        return false;
    } else if (!regExps.password.test(password.value)) {
        Toastify({
            text: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one number",
            duration: 3000,
            newWindow: true,
            gravity: "top",
            position: 'right',
            backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
            stopOnFocus: true,
            onClick: function(){}
        }).showToast();
        return false;
    } else {
        return true;
    }
}

const login = async (e) => {
    e.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    }

    if (!validateForm()) return;
    await fetch('http://localhost:8080/api/auth/login', options)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                Toastify({
                    text: data.message,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top",
                    position: 'right',
                    backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
                    stopOnFocus: true,
                    onClick: function(){}
                }).showToast();
                setTimeout(() => {
                    window.location.href = 'http://localhost:8080/dashboard';
                    }, 1000);
            } else {
                Toastify({
                    text: data.error,
                    duration: 3000,
                    newWindow: true,
                    gravity: "top",
                    position: 'right',
                    backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
                    stopOnFocus: true,
                    onClick: function(){}
                }).showToast();
            }
        })
        .catch(err => console.log(err));
}


loginForm.addEventListener('submit', (e) => login(e));