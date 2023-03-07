import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

const App = () => {
 
  const [urls, setURLS] = useState([])

  useEffect(() => {
    getUrls()
    .then((data) => setURLS(data.urls))
  }, [])
  
  let postURL = (url) => {
    console.log(urls)
     fetch('http://localhost:3001/api/v1/urls', {
        method: "POST",
        body: JSON.stringify(url),
        headers: { "Content-Type": "application/json" }
      })
      .then((response) => {
        if (response.ok) {
          response.json();
          console.log("Posted!", response)
          getUrls()
          .then((data) => setURLS(data.urls))
        }
        else if (!response.ok) {
          console.log("Response Not Ok", response)
        }
      })
      .catch((error) => {
        console.log(`An error occurred: ${error.message}`);
      });
  }
  

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm postURL={postURL}/>
      </header>
      <UrlContainer urls={urls}/>
    </main>
  );
  
}

export default App;
