let main;
let section;

export function setupLogin(mainElement, sectionElement) {
    main = mainElement
    section = sectionElement;
}

export async function viewLogin() {
    const url = 'http://localhost:3030/users/login';
    const form = document.querySelector('form');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        const response = await fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.status == 200) {
            const data = await response.json();
            sessionStorage.setItem('userEmail', data.email);
            sessionStorage.setItem('accessToken', data.accessToken);
            sessionStorage.setItem('userId', data._id);
            document.getElementById('guest').style.display = 'none';
            document.getElementById('user').style.display = 'inline';
        }
    });
    main.innerHTML = '';
    main.appendChild(section);
}