require('dotenv').config(); // Load environment variables from a .env file

const apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
const apiKey = process.env.API_KEY;

// Construct the URL with parameters
const url = `${apiUrl}?keyword=cruise&location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=${apiKey}`;

// Perform the fetch
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Process the data from the API response
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
