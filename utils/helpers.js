module.exports = {
    format_date: (date) => {
      return date.toDateString();
    },
    format_time: (date) => {
      return date.toLocaleTimeString()
    },
  };
  