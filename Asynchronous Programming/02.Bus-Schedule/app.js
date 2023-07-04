function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const spanEl = document.querySelector('.info');

    let stop = {
        next: 'depot'
    };


    async function depart() {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);
        const data = await response.json();
        stop = data;
        spanEl.textContent = `Next stop ${stop.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        spanEl.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();