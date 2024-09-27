import React, { useState } from 'react';
import '../componentStyles/EditDelete.css';
import { editWord } from '../apiService/wordsApi'; // You'll create this API call in the backend
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../components/Autocomplete';

const Edit = ({ wordParam: word, onClose }) => {
  const [newWord, setNewWord] = useState(word.word);
  const [synonyms, setSynonyms] = useState(word.synonym); 

  const navigate = useNavigate();

  const addSynonym = (selectedWord) => {
    if (!synonyms.includes(selectedWord.word)) {
      setSynonyms([...synonyms, selectedWord.word]);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleEdit = async (e) => {
    e.stopPropagation();
    try {
      const result = await editWord(word.word, newWord, synonyms);
      if (result) {
        navigate(0);
        handleCancel();
      }
    } catch (error) {
      console.error("Failed to update the word", error);
    }
  };

  const handleRemoveSynonym = (syn) => {
    setSynonyms(synonyms.filter(s => s !== syn));
  };

  return (
    <div className="full-screen" onClick={handleCancel}>
      <div className="full-screen-form" onClick={(e) => e.stopPropagation()}>
        <h3>Edit {word.word}</h3>
        <label>Edit Word:</label>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          className="full-screen-input"
        />
        <label>Edit Synonyms:</label>
        {synonyms.map((syn, index) => (
          <div key={index} className="synonym-list">
            <span>{syn}</span>
            <button
              className="remove-synonym-btn"
              onClick={() => handleRemoveSynonym(syn)}
            >
              Remove
            </button>
          </div>
        ))}
        <p>Find Synonyms:</p>
        <Autocomplete
            onSelect={addSynonym} 
          />
        <div className="full-screen-form-buttons">
          <button className="full-screen-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="full-screen-cancel" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
