// Initialize the map
var map = L.map('map').setView([34.0522, -118.2437], 13);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to parse CSV data
function parseCSV(csv) {
    var lines = csv.split('\n');
    var result = [];
    var headers = lines[0].split(',');

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(',');

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return result;
}

// Fetch and parse the CSV file
fetch('locos.csv')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        var locations = parseCSV(data);
        var mainPart = document.querySelector('.main-part');

        locations.forEach(location => {
            var button = document.createElement('button');
            button.className = 'location-button';
            button.innerText = location.name;
            button.setAttribute('data-lat', location.lat);
            button.setAttribute('data-lng', location.lng);
            button.setAttribute('data-notes', location.notes);

            button.addEventListener('click', function() {
                var lat = this.getAttribute('data-lat');
                var lng = this.getAttribute('data-lng');
                map.setView([lat, lng], 13);
            });

            button.addEventListener('mouseover', function() {
                var notes = this.getAttribute('data-notes');
                document.getElementById('notes').innerText = notes;
            });

            button.addEventListener('mouseout', function() {
                document.getElementById('notes').innerText = '';
            });

            mainPart.appendChild(button);
        });
    })
    .catch(error => console.error('Error fetching the CSV file:', error));

// Add event listener to the add location button
document.getElementById('add-location-button').addEventListener('click', function() {
    var name = prompt('Enter the name of the location:');
    if (!name) return; // User cancelled the prompt

    var lat = prompt('Enter the latitude:');
    if (lat === null) return; // User cancelled the prompt

    var lng = prompt('Enter the longitude:');
    if (lng === null) return; // User cancelled the prompt

    var notes = prompt('Enter any notes:');
    if (notes === null) notes = ''; // User cancelled the prompt

    var button = document.createElement('button');
    button.className = 'location-button';
    button.innerText = name;
    button.setAttribute('data-lat', lat);
    button.setAttribute('data-lng', lng);
    button.setAttribute('data-notes', notes);

    button.addEventListener('click', function() {
        map.setView([lat, lng], 13);
    });

    button.addEventListener('mouseover', function() {
        document.getElementById('notes').innerText = notes;
    });

    button.addEventListener('mouseout', function() {
        document.getElementById('notes').innerText = '';
    });

    document.querySelector('.main-part').appendChild(button);
});
