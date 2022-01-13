getCoords()

async function getCoords () {
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    let coordinates = [pos.coords.latitude, pos.coords.longitude];

    createMap(coordinates)
}

function createMap(coordinates){
    console.log(coordinates);

    const myMap = L.map('map',{
        center: coordinates,
        zoom: 12
    });
    // adding Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '4',
    }).addTo(myMap)
    const marker = L.marker(coordinates).addTo(myMap)

    search()
}

function search(coordinates, myMap) {
    document.querySelector('#submit').addEventListener('click', async(e) => {
        e.preventDefault()
        let selectedLocations = document.querySelector('#locations');
        let optionValue = selectedLocations.options[selectedLocations.selectedIndex].value;

        const options = {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            Authorization: "fsq3lRxy/ESIhkzljQ(7p6MfQX2NfpCr2LcMF+illkFE02c="
            }
        }
        let limit = 5;
        let lat = coordinates[0];
        let on = coordinates[1];
        let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${optionValue}&limit=${limit}&ll=${lat}%2c${lon}&radius=15000`, options)

        let data = await response.json();
        locationsArray = data.results

        locationsArray.forEach((location) => {
            marker = L.marker([location.geocodes.main.latitude,location.geocodes.main.longitude]).addTo(myMap)
            marker.bindPopup(`<b>${location.name}</b>`).openPopup();
            setTimeout( () => {
                marker.remove()
            }, 2000)
        })
            
        });
    }
