import React, { useState, useContext } from 'react';
import '../componentStyles/EditDelete.css';
import { editWord } from '../apiService/wordsApi';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../components/Autocomplete';
import { ModelContext } from '../context/modelContext';

const Edit = ({ wordParam: word, onClose }) => {
  const [newWord, setNewWord] = useState(word.word);
  const [synonyms, setSynonyms] = useState(
    word.synonym.map((el) => ({ word: el }))
  );
  const { model } = useContext(ModelContext);

  const navigate = useNavigate();

  console.log(synonyms);

  const addSynonym = (selectedWord) => {
    if (!synonyms.includes(selectedWord.word)) {
      setSynonyms([...synonyms, selectedWord]);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleEdit = async (e) => {
    e.stopPropagation();

    try {
      if (model === 'basic') {
        const flattenedArray = synonyms.reduce((acc, obj) => {
          acc.push(obj.word);

          if (obj.synonym) {
            acc.push(...obj.synonym);
          }

          return acc;
        }, []);
        const synWithoutDups = [...new Set(flattenedArray)];
        const result = await editWord(word.word, newWord, synWithoutDups);
        if (result) {
          navigate(`/words/${newWord}`);
          handleCancel();
        }
      }

      if (model === 'transitive') {
        const onlySyns = synonyms.map((el) => el.word);
        const result = await editWord(word.word, newWord, onlySyns);
        if (result) {
          navigate(`/words/${newWord}`);
          handleCancel();
        }
      }
    } catch (error) {
      console.error('Failed to update the word', error);
    }
  };

  const handleRemoveSynonym = (syn) => {
    setSynonyms(synonyms.filter((s) => s !== syn));
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
        {synonyms &&
          synonyms.map((syn, index) => (
            <div key={index} className="synonym-list">
              <span>{syn.word}</span>
              {syn.synonym && (
                <p className="synonym-element-syn-synonym">
                  Synonyms of {syn.word}: {syn.synonym.join(', ')}
                </p>
              )}
              <button
                className="remove-synonym-btn"
                onClick={() => handleRemoveSynonym(syn)}
              >
                Remove
              </button>
            </div>
          ))}
        <p>Find Synonyms:</p>
        <Autocomplete onSelect={addSynonym} />
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
