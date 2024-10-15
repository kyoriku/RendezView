const axios = require('axios');

async function geocodeAddress(address) {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'RendezView/1.0'
      }
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

module.exports = { geocodeAddress };