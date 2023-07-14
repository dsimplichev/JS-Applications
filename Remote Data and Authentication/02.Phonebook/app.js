function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadData);
    document.getElementById('btnCreate').addEventListener('click', createContant);
}

attachEvents();

async function loadData() {
    const respons = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await respons.json();
    printData(data);
}

function printData(data) {
    const ulEl = document.getElementById('phonebook');
    ulEl.innerHTML = '';

    Object.values(data).map(el => {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.addEventListener('click', () => deleteContact(el._id));
        const spanEl = document.createElement('span');
        spanEl.append(button);
        const liEl = document.createElement('li');
        liEl.id = el._id;
        liEl.textContent += `${el.person}: ${el.phone}  `;
        liEl.append(spanEl);
        ulEl.append(liEl);
    });


}

async function deleteContact(id) {
    await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
        method: 'delete'
    });

    loadData();
}

async function createContant() {
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;

    const respons = await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            person,
            phone
        })
    });

    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';

    loadData();
}