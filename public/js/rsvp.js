const getEventIdFromUrl = () => {
  const urlParts = window.location.toString().split("/");
  return urlParts[urlParts.length - 1];
};

const rsvpHandler = async (event) => {
  event.preventDefault();
  const eventId = getEventIdFromUrl();

  if (eventId) {
    const response = await fetch(`/api/events/${eventId}/rsvp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/event/${eventId}`);
    } else {
      alert('Failed to RSVP');
    }
  } else {
    alert('Event ID not found');
  }
};

const cancelRsvpHandler = async (event) => {
  event.preventDefault();
  const eventId = getEventIdFromUrl();

  if (eventId) {
    const response = await fetch(`/api/events/${eventId}/cancel-rsvp`, {
      method: 'POST',
    });

    if (response.ok) {
      document.location.replace(`/event/${eventId}`);
    } else {
      alert('Failed to cancel RSVP');
    }
  } else {
    alert('Event ID not found');
  }
};

if (document.querySelector('.rsvp-btn')) {
  document.querySelector('.rsvp-btn').addEventListener('click', rsvpHandler);
}

if (document.querySelector('.cancel-rsvp-btn')) {
  document.querySelector('.cancel-rsvp-btn').addEventListener('click', cancelRsvpHandler);
}
