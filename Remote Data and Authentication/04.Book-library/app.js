function startApp() {

    document.getElementById('loadBooks').addEventListener('click', loadBooks);
    document.querySelector('#submitForm').addEventListener('submit', submitBook);
    document.querySelector('table').addEventListener('click', updateData);
}

startApp();

async function updateData(event) {
    const id = event.target.parentNode.parentNode.dataset.id;
    const editForm = document.querySelector('#editForm');
    const submitForm = document.querySelector('#submitForm');

    if (event.target.className == 'editBtn') {
        editForm.style.display = 'block';
        submitForm.style.display = 'none';


        const response = await requestData(`http://localhost:3030/jsonstore/collections/books/${id}`);

        editForm.querySelector('input[name="title"]').value = response.title;
        editForm.querySelector('input[name="author"]').value = response.author;

        document.querySelector('#editForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(document.querySelector('#editForm'));
            const title = formData.get('title');
            const author = formData.get('author');


            const putData = await requestData(`http://localhost:3030/jsonstore/collections/books/${id}`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    author
                })
            });
            loadBooks();
        });
    }

    if (event.target.className == 'deleteBtn') {

        await requestData(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: 'delete',
            headers: {
                'Content-type': 'application/json'
            }
        });

        loadBooks();
    }

}

async function requestData(url, option) {

    const respons = await fetch(url, option);

    if (respons.ok == false) {
        const error = await respons.json();
        alert(error.message);
        throw new Error(error.message);
    }

    const data = await respons.json();
    return data;
}


async function loadBooks(row) {

    const tableBody = document.querySelector('table tbody');
    const data = await requestData('http://localhost:3030/jsonstore/collections/books');

    tableBody.innerHTML = Object.entries(data).map(renderBooks).join('');

}

function renderBooks([id, book]) {

    const result = `
     <tr data-id= "${id}">
         <td>${book.title}</td>
         <td>${book.author}</td>
          <td>
         <button class="editBtn">Edit</button>
        <button class="deleteBtn">Delete</button> 
        </td> 
        </tr>
    `;

    return result;
}

async function submitBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const options = {
        title,
        author
    };

    requestData('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    });

    event.target.querySelector('input[name="title"]').value = '';
    event.target.querySelector('input[name="author"]').value = '';

    loadBooks();
}