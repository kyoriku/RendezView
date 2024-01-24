// Function to extract event ID from the URL
const getEventIdFromUrl = () => {
  const urlParts = window.location.toString().split("/");
  return urlParts[urlParts.length - 1];
};

// Function to handle form submission for editing events
const editFormHandler = async (event) => {
  event.preventDefault();

  const name = event.target.querySelector('#event-name').value.trim();
  const description = event.target.querySelector('#event-description').value.trim();
  const date = event.target.querySelector('#event-date').value.trim();
  const venue = event.target.querySelector(`#event-venue`).value.trim();
  const event_id = getEventIdFromUrl();

  if (name && description && date && venue) {
    const response = await fetch(`/api/events/${event_id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description, date, venue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to edit event');
    }
  } else {
    alert('Please fill in all the fields for editing');
  }
};

// Function to fetch existing data for the event
const fetchEventData = async () => {
  const event_id = getEventIdFromUrl();

  try {
    const response = await fetch(`/api/events/${event_id}`);
    if (response.ok) {
      const eventData = await response.json();
      console.log('Fetched Event Data:', eventData);

      // Adjust the date to Eastern Standard Time (EST)
      const eventDate = new Date(eventData.date);
      const estOffset = -5 * 60; // Offset in minutes for Eastern Standard Time
      const estDate = new Date(eventDate.getTime() + estOffset * 60000);

      // Format the date to be displayed in the "yyyy-MM-ddThh:mm" format
      const formattedDate = estDate.toISOString().slice(0, 16);

      document.getElementById('event-name').value = eventData.name;
      document.getElementById('event-description').value = eventData.description;
      document.getElementById('event-date').value = formattedDate;
      document.getElementById('event-venue').value = eventData.venue_id;
    } else {
      console.error('Failed to fetch event data for editing');
    }
  } catch (error) {
    console.error('Error fetching event data:', error);
  }
};

document.addEventListener('DOMContentLoaded', fetchEventData);

document
  .querySelector('.edit-event-form')
  .addEventListener('submit', editFormHandler);
