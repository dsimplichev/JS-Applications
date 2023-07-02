async function getInfo() {

    const stopId = document.querySelector('#stopId').value;
    const stopName = document.querySelector('#stopName');
    const buses = document.querySelector('#buses');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    const validBusesId = ['1287', '1308', '1327', '2334'];


    try {
        buses.innerHTML = '';
        if (!validBusesId.includes(stopId)) {
            throw new Error('Invalid bus id');
        }
        const response = await fetch(url);
        const data = await response.json();

        stopName.textContent = data.name;
        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${time}`;
            buses.append(liElement);
        });
    } catch (error) {
        alert(error);
        stopName.textContent = 'Error';
    }
}