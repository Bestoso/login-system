const logOutBtn = document.getElementById('logOut');

const logOut = async (e) => {
    e.preventDefault();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch('http://localhost:8080/api/auth/logout', options)

    if (response.status === 200) {
        alert('You have been logged out');
        setTimeout(() => {
            window.location.href = 'http://localhost:8080/login';
        }, 1000);
    } else {
        alert('Something went wrong');
    }
}

// logOutBtn.addEventListener('click', (e) => logOut(e));