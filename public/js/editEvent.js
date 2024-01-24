// Function to extract event ID from the URL
const getEventIdFromUrl = () => {
  // Split the URL by "/" to get an array of URL parts
  const urlParts = window.location.toString().split("/");
  // Return the last part of the URL, which is assumed to be the event ID
  return urlParts[urlParts.length - 1];
};

// Function to handle form submission for editing events
const editFormHandler = async (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Extract values from form input fields
  const name = event.target.querySelector('#event-name').value.trim();
  const description = event.target.querySelector('#event-description').value.trim();
  const date = event.target.querySelector('#event-date').value.trim();
  const venue = event.target.querySelector(`#event-venue`).value.trim();
  // Get the event ID from the URL using the helper function
  const event_id = getEventIdFromUrl();

  // Check if all required fields are filled
  if (name && description && date && venue) {
    // Send a PUT request to update the event data
    const response = await fetch(`/api/events/${event_id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description, date, venue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (response.ok) {
      // Redirect to the user's profile page after successful editing
      document.location.replace('/profile');
    } else {
      // Display an alert if the request fails
      alert('Failed to edit event');
    }
  } else {
    // Display an alert if any required field is empty
    alert('Please fill in all the fields for editing');
  }
};

// Function to fetch existing data for the event
const fetchEventData = async () => {
  // Get the event ID from the URL using the helper function
  const event_id = getEventIdFromUrl();

  try {
    // Fetch event data from the server
    const response = await fetch(`/api/events/${event_id}`);
    // Check if the request was successful
    if (response.ok) {
      // Parse the response JSON and log the fetched event data
      const eventData = await response.json();

      // Adjust the date to Eastern Standard Time (EST)
      const eventDate = new Date(eventData.date);
      const estOffset = -5 * 60; // Offset in minutes for Eastern Standard Time
      const estDate = new Date(eventDate.getTime() + estOffset * 60000);

      // Format the date to be displayed in the "yyyy-MM-ddThh:mm" format
      const formattedDate = estDate.toISOString().slice(0, 16);

      // Populate the form fields with the fetched event data
      document.getElementById('event-name').value = eventData.name;
      document.getElementById('event-description').value = eventData.description;
      document.getElementById('event-date').value = formattedDate;
      document.getElementById('event-venue').value = eventData.venue_id;
    } else {
      // Log an error message if fetching event data fails
      console.error('Failed to fetch event data for editing');
    }
  } catch (error) {
    // Log an error message if an exception occurs during the fetch operation
    console.error('Error fetching event data:', error);
  }
};

// Execute the fetchEventData function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchEventData);

// Add an event listener to the form for handling submit events
document
  .querySelector('.edit-event-form')
  .addEventListener('submit', editFormHandler);
