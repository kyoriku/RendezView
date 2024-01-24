const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#event-name').value.trim();
  const description = document.querySelector('#event-description').value.trim();
  const date = document.querySelector('#event-date').value.trim();
  const venue = document.querySelector(`#event-venue`).value.trim();

  if (name && description && date && venue) {
    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify({ name, description, date, venue }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create event');
    }
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

document
  .querySelector('.new-event-form')
  .addEventListener('submit', newFormHandler);

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', delButtonHandler);
  });
  
  document.querySelectorAll('.update-btn').forEach(button => {
    button.addEventListener('click', () => {
      const { dataset: { id } } = button;
      window.location.href = `/edit-event/${id}`;
    });
  });
  