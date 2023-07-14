function attachEvents() {
   
    document.getElementById('submit').addEventListener('click', sendMessage);
    document.getElementById('refresh').addEventListener('click', getMessages);

    const url = 'http://localhost:3030/jsonstore/messenger'

    async function sendMessage() {
        
        const author = document.querySelector('#controls input[name="author"]').value;
        const content = document.querySelector('#controls input[name="content"]').value;
         
        if (author == '' || content == '') {
            return alert ('All field are requared');
        }
        
        const respons = await fetch (url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author,
                content
            })
        });
        document.querySelector('#controls input[name="author"]').value = '';
        document.querySelector('#controls input[name="content"]').value = '';
        const data = await respons.json();

    }
    async function getMessages() {
        const respons = await fetch(url, {
            method: 'get'
        });

        const data = await respons.json();
        printData(data);
    }
    function printData(data) {
        const messages = document.getElementById('messages');
        messages.value = '';
        Object.values(data).map(el => messages.value += `${el.author}: ${el.content}\n`);
    }
    }

}
attachEvents();