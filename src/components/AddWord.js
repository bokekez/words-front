import React, {  useState, useContext } from 'react';
import '../componentStyles/AddWord.css'; 
import Autocomplete from '../components/Autocomplete';
import { showToastifyWarning } from '../utils/toast';
import { addWordApi } from '../apiService/wordsApi';
import { ModelContext } from '../context/modelContext';

const AddWord = () => {
  const [word, setWord] = useState('');
  const [synonym, setSynonym] = useState([]);
  const { model } = useContext(ModelContext);

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

    if(model === 'basic'){
      const flattenSyn = synonym.flatMap(item => [...item.synonym, item.word])
      const synWithoutDups = [...new Set(flattenSyn)];
      const addWord = addWordApi(word, synWithoutDups)
      if(addWord){
        setWord(''); 
        setSynonym([]); 
      }
    }

    if(model === 'transitive'){
      const synonyms = synonym.map(el => el.word)
      const addWord = addWordApi(word, synonyms)
      if(addWord){
        setWord(''); 
        setSynonym([]); 
      }
    }
    
  };

  const removeSynonym = (syn) =>{
    setSynonym(synonym.filter(el => el !== syn))
  }

  return (
    <div className="add-word-container">
      <h2>Add a New Word</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="word-input">Word:</label>
          <input
            id="word-input"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word"
          />
        </div>
        <div>
          <label>Find Synonyms:</label>
          <Autocomplete
            onSelect={addSynonym} 
          />
        </div>
        <p>Synonyms:</p>
        {synonym.length ? (
          <div>
            {synonym.map(syn => (
              <div className="synonym-element" key={syn}>
                <p className="synonym-element-syn">{syn.word}</p>
                <p className="synonym-element-syn-synonym">Synonyms of {syn.word}: {syn.synonym.join(', ')}</p>
                <button className="synonym-list-button" type="button" onClick={() => removeSynonym(syn)}>X</button>
              </div>
            ))}
          </div>
        ) :
        <div>No synonyms to add</div>
        }
        <button className="add-word-button" type="submit">Add Word</button>
      </form>
    </div>
  );
}

export default AddWord;
