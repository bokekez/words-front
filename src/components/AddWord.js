import React, { useState, useContext } from 'react';
import '../componentStyles/AddWord.css';
import Autocomplete from '../components/Autocomplete';
import { showToastifyWarning } from '../utils/toast';
import { addWordApi } from '../apiService/wordsApi';
import { ModelContext } from '../context/modelContext';

const AddWord = () => {
  const [word, setWord] = useState('');
  const [synonym, setSynonym] = useState([]);
  const [addSyn, setAddSyn] = useState(false);
  const [strict, setStrict] = useState(true);
  const [synomyAsWord, setSynonymAsWord] = useState('')
  const { model } = useContext(ModelContext);

  console.log(strict)

  const addSynonym = (selectedWord) => {
    if (!synonym.some(el => el.word === selectedWord.word)) {
      setSynonym([...synonym, selectedWord]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!word) {
      showToastifyWarning('Word is required.', 'word');
      return;
    }

    if (model === 'basic') {
      const flattenSyn = synonym.flatMap((item) => [
        ...item.synonym,
        item.word,
      ]);
      const synWithoutDups = [...new Set(flattenSyn)];
      const addWord = addWordApi(word, synWithoutDups, strict);
      if (addWord) {
        setWord('');
        setSynonym([]);
      }
    }

    if (model === 'transitive') {
      const synonyms = synonym.map((el) => el.word);
      const addWord = addWordApi(word, synonyms, strict);
      if (addWord) {
        setWord('');
        setSynonym([]);
      }
    }
  };

  const removeSynonym = (syn) => {
    setSynonym(synonym.filter((el) => el !== syn));
  };

  const handleShowSyn = () => {
    setAddSyn(true);
  };

  const handleSynAsWord = () => {
    const synToAdd = {
      word: synomyAsWord,
      synonym: []
    }
    addSynonym(synToAdd)
  }

  const hadleStrict = () => {
    setStrict(strict ? false : true)
  }
  
  return (
    <div className="add-word-container">
      <h2>Add a New Word</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-word-checkbox">
          <input type="checkbox" onClick={hadleStrict} value={strict} defaultChecked="true"/>
          <label className="add-word-checkbox-label">Strict?</label>
        </div>
        <div>
          <label htmlFor="word-input">Word to add:</label>
          <input
            id="word-input"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word"
          />
        </div>
        
          <div>
            <p>Synonyms:</p>
            {synonym.length ? (
              <div>
                {synonym.map((syn) => (
                  <div className="synonym-element" key={syn}>
                    <p className="synonym-element-syn">{syn.word}</p>
                    <p className="synonym-element-syn-synonym">
                      Synonyms of {syn.word}: {syn.synonym.join(', ')}
                    </p>
                    <button
                      className="synonym-list-button"
                      type="button"
                      onClick={() => removeSynonym(syn)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div>No synonyms to add</div>
            )}
            </div>
            {!addSyn && (
          <button
            className="add-word-button syn-button"
            onClick={handleShowSyn}
          >
            Find Synonyms?
          </button>
        )}      

        {addSyn && (    
            <div>
              <label>Find Synonyms:</label>
              <Autocomplete onSelect={addSynonym} />
            </div>
        )}
        {!strict && 
          <div>
            <label htmlFor="word-input">Add synomy as a new word:</label>
            <input
              id="word-input"
              type="text"
              value={synomyAsWord}
              onChange={(e) => setSynonymAsWord(e.target.value)}
              placeholder="Enter word"
            />
            <button onClick={handleSynAsWord} type="button">Add</button>
          </div>
        }
        <button className="add-word-button" type="submit">
          Add Word
        </button>
      </form>
    </div>
  );
};

export default AddWord;
