function initMap() {
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error('Map container not found');
    return;
  }

  // Read data attributes for latitude and longitude
  const rawLat = mapElement.dataset.latitude;
  const rawLng = mapElement.dataset.longitude;

  // console.log('Latitude:', rawLat); 
  // console.log('Longitude:', rawLng); 

  const latitude = parseFloat(rawLat);
  const longitude = parseFloat(rawLng);

  if (isNaN(latitude) || isNaN(longitude)) {
    console.error('Invalid coordinates:', latitude, longitude); // Log invalid coordinates
    mapElement.textContent = 'Map data unavailable';
    return;
  }

  const center = [latitude, longitude];

  const map = L.map(mapElement).setView(center, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker(center).addTo(map)
    // .bindPopup('<div class="custom-popup">Event Location</div>')
    .openPopup();
}

document.addEventListener('DOMContentLoaded', initMap);
