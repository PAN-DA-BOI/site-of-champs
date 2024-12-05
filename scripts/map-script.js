var map = L.map('map').setView([40.86423, -111.88974], 16);

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array of locations
var locations = [
    { lat: 40.88712, lng: -111.8952, notes: "Note: Old Cinemark", name: "Movie Theater" },
    { lat: 40.90575, lng: -111.8774, notes: "Note: The building next to the DI", name: "Joann" },
    { lat: 40.742931, lng: -111.929172, notes: "Note: abandoned food world building", name: "Food World" }
];

// Add markers to the map
locations.forEach(location => {
    L.marker([location.lat, location.lng]).addTo(map)
        .bindPopup(`<b>${location.name}</b><br>${location.notes}`);
});

// Add event listeners to the location buttons
document.querySelectorAll('.location-button').forEach(button => {
    button.addEventListener('click', function() {
        var lat = this.getAttribute('data-lat');
        var lng = this.getAttribute('data-lng');
        map.setView([lat, lng], 16);
    });

    button.addEventListener('mouseover', function() {
        var notes = this.getAttribute('data-notes');
        document.getElementById('notes').innerText = notes;
    });

    button.addEventListener('mouseout', function() {
        document.getElementById('notes').innerText = '';
    });
});
