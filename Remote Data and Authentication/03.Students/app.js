window.addEventListener('load', startApp);


function startApp() {

    document.querySelector('.inputs').addEventListener('submit', event => {
        event.preventDefault();
    })
    document.getElementById('submit').addEventListener('click', (event) => postDataToServer(event));

}

async function getDataFromServer() {

    const tableBody = document.querySelector('#results tbody');
    const respons = await fetch('http://localhost:3030/jsonstore/collections/students');
    const data = await respons.json();

    tableBody.innerHTML = Object.values(data).sort((a, b) => b.grade - a.grade).map(renderData).join('');

    return tableBody;
}

function renderData(row) {
    const grade = Number(row.grade);
    const result = `<tr>
            <td>${row.firstName}</td>
            <td>${row.lastName}</td>
            <td>${row.facultyNumber}</td>
            <td>${grade}</td>
          </tr>
    `;

    return result;
}

async function postDataToServer(event) {

    event.preventDefault();
    const firstName = document.querySelector('.inputs input[name="firstName"]').value;
    const lastName = document.querySelector('.inputs input[name="lastName"]').value;
    const facultyNumber = document.querySelector('.inputs input[name="facultyNumber"]').value;
    const grade = Number(document.querySelector('.inputs input[name="grade"]').value).toFixed(2);

    await fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            facultyNumber,
            grade
        })
    });


    document.querySelector('.inputs input[name="firstName"]').value = '';
    document.querySelector('.inputs input[name="lastName"]').value = '';
    document.querySelector('.inputs input[name="facultyNumber"]').value = '';
    document.querySelector('.inputs input[name="grade"]').value = '';

    getDataFromServer();

}