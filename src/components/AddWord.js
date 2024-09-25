import React, { Fragment, useState } from 'react';
import '../componentStyles/AddWord.css'; 
import Autocomplete from '../components/Autocomplete';
import { showToastifySuccess, showToastifyError, showToastifyWarning } from '../utils/toast';

const AddWord = () => {
  const [word, setWord] = useState('');
  const [synonym, setSynonym] = useState([]);

  const addSynonym = (selectedWord) => {
    if (!synonym.includes(selectedWord)) {
      setSynonym([...synonym, selectedWord]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!word) {
      showToastifyWarning('Word is required.', 'word');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word,
          synonym: synonym, 
        }),
      });

      if (response.ok) {
        showToastifySuccess(`${word} was added successfully!`, 'wordAdded');
        setWord(''); 
        setSynonym([]); 
      } else {
        const errorData = await response.json();
        showToastifyError(`Error: ${errorData.message}`, 'addingError');
      }
    } catch (error) {
      showToastifyError('Failed to add word.', 'wentWrong');
    }
  };

  return (
    <div className="add-word-container">
      <h2>Add a New Word</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Word:</label>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word"
          />
        </div>
        <div>
          <label>Synonyms (autocomplete):</label>
          <Autocomplete
            onSelect={addSynonym} 
          />
        </div>
        {synonym.length ? (
          <div className="synonym-list">
            <p>Synonyms:</p>
            {synonym.map(syn => (
              <div>{syn}</div>
            ))}
          </div>
        ) :
        <Fragment/ >
        }
        <button type="submit">Add Word</button>
      </form>
    </div>
  );
}

export default AddWord;
