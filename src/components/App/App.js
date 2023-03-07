import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

const App = () => {
 
  const [urls, setURLS] = useState([])
  const [error, setError] = useState(true)

  useEffect(() => {
    updateURLS()
  }, [])

  let updateURLS = () => {
    getUrls()
      .then((data) => {
        if (data) {
          setURLS(data.urls);
          setError("");
        } else {
          setError("failed to fetch");
        }
      })
      .catch((error) => {
        console.log(`An error occurred: ${error}`);
        setError(error.message);
      });
  }
  
  let postURL = (url) => {
     fetch('http://localhost:3001/api/v1/urls', {
        method: "POST",
        body: JSON.stringify(url),
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        if (response.ok) {
          response.json();
          console.log("Posted!", response)
          updateURLS()
        }
        else if (!response.ok) {
          response.json();
          console.log("Response Not Ok", response)
          setError(response.message)
        }
      })
      .catch((error) => {
        console.log(`An error occurred: ${error.message}`);
        setError(error.message);
      });
  }
  

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm postURL={postURL} />
      </header>
      {!error && <UrlContainer urls={urls} />}
      {error && <p className="error-message">Error: {error}</p>}
    </main>
  );
  
}

export default App;
