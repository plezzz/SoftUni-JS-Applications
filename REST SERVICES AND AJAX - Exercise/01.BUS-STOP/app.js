function getInfo() {
    let stopID = document.getElementById('stopId').value;
    let stopName = document.getElementById('stopName');
    let busContainer = document.getElementById('buses');
    const busesURL = `https://judgetests.firebaseio.com/businfo/${stopID}.json`;

    stopName.textContent = '';
    busContainer.textContent = '';
    fetch(busesURL)
        .then(result =>result.json())
        .then(data =>{
            const {name,buses} = data;
            stopName.textContent = name
            Object.entries(buses)
                .forEach(([busId,time])=>{
                    const li = document.createElement('li');
                    li.textContent=`Bus ${busId} arrives in ${time}`;
                    busContainer.appendChild(li)
                })
        })
        .catch((err)=>{
            stopName.textContent = 'Error'
        })
}
