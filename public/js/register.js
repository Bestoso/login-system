const registerForm = document.getElementById('registerForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

function validateForm (){
    const regExps = {
        username: /^[a-zA-Z0-9]{5,}$/,
        email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    }

    if (!regExps.username.test(username.value)) {
        Toastify({
            text: "Username must be at least 5 characters long and contain only letters and numbers",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
            stopOnFocus: true,
            onClick: function(){}
        }).showToast();
        return false;
    } else if (!regExps.email.test(email.value)) {
        Toastify({
            text: "Email is not valid",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
            stopOnFocus: true,
            onClick: function(){
                Swal.fire({
                    title: 'Email is not valid',
                    text: 'Please enter a valid email address',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }).showToast();
        return false;
    } else if (!regExps.password.test(password.value)) {
        Toastify({
            text: "Password must be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter and 1 number",
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
            stopOnFocus: true,
            onClick: function(){}
        }).showToast();
        return false;
    } else {
        return true;
    }
}

const register = async (e) => {
    e.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        })
    }

    if (!validateForm()) return;
    await fetch('http://localhost:8080/api/auth/register', options)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                Toastify({
                    text: data.message,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
                    stopOnFocus: true,
                    onClick: function(){}
                }).showToast();
                setTimeout(() => {
                window.location.href = 'http://localhost:8080/login';
                }, 1000);
            } else {
                Toastify({
                    text: data.error,
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "linear-gradient(to right, #00a1b0, #a1aedb)",
                    stopOnFocus: true,
                    onClick: function(){}
                }).showToast();
            }
        })
        .catch(err => console.log(err));
}


registerForm.addEventListener('submit', (e) => register(e));