function solve() {

    const info = document.getElementsByClassName('info')[0];
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let currentID = 'depot';
    let currentName;

    function depart() {
        fetch(`https://judgetests.sfirebaseio.com/schedule/${currentID}.json`)
            .then(result => result.json())
            .then(data => {
                const {name, next} = data;
                currentID = next;
                currentName = name;

                departBtn.disabled = true;
                arriveBtn.disabled = false;
                info.textContent = `Next stop ${currentName}`;
            })
            .catch(err => {
               info.textContent = 'Error';
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            })
    }

    function arrive() {
        info.textContent = `Arriving at ${currentName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
