export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      .catch((error) => {
        console.log(`API Error: ${error.message}`)
      });
}
