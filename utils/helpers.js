module.exports = {
  format_date: (date) => {
    const options = { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  },
  format_time: (date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  },
};
