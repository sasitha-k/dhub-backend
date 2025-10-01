export const handleKeyEnter = (callback) => (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission behavior
    callback();
  }
};