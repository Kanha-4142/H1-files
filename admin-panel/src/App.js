import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [h1Text, setH1Text] = useState('');
  const [newH1Text, setNewH1Text] = useState('');

  useEffect(() => {
    axios.get('h1-files.vercel.app/api/h1-text')
      .then(response => {
        setH1Text(response.data.text);
      })
      .catch(error => {
        console.error('There was an error fetching the h1 text!', error);
      });
  }, []);

  const handleUpdateClick = () => {
    axios.post('h1-files.vercel.app/api/h1-text', { text: newH1Text })
      .then(response => {
        setH1Text(response.data.text);
        setNewH1Text('');
      })
      .catch(error => {
        console.error('There was an error updating the h1 text!', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Current h1 Text: {h1Text}</h1>
        <input
          type="text"
          placeholder='Enter h1 text'
          value={newH1Text}
          onChange={e => setNewH1Text(e.target.value)}
        />
        <button onClick={handleUpdateClick}>Update h1 Text</button>
      </header>
    </div>
  );
}

export default App;
