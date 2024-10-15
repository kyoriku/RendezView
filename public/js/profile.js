const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#event-name').value.trim();
  const description = document.querySelector('#event-description').value.trim();
  const date = document.querySelector('#event-date').value.trim();
  const address = document.querySelector('#event-address').value.trim();

  if (name && description && date && address) {
    try {
      // Geocode the address using Nominatim
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
      const geocodeResponse = await fetch(geocodeUrl);
      const geocodeData = await geocodeResponse.json();

      if (geocodeData.length === 0) {
        throw new Error('Address not found');
      }

      const latitude = parseFloat(geocodeData[0].lat);
      const longitude = parseFloat(geocodeData[0].lon);

      // Send the request to create the event
      const response = await fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify({ name, description, date, address, latitude, longitude }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      alert(error.message || 'Failed to create event');
    }
  } else {
    alert('Please fill out all fields');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete event');
    }
  }
};

document.querySelector('.new-event-form').addEventListener('submit', newFormHandler);

document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', delButtonHandler);
});

document.querySelectorAll('.update-btn').forEach(button => {
  button.addEventListener('click', () => {
    const { dataset: { id } } = button;
    window.location.href = `/edit-event/${id}`;
  });
});

document.getElementById('event-date').addEventListener('click', function () {
  this.showPicker();
});
