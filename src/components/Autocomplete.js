import React, { useState, useEffect } from 'react';
import '../componentStyles/Autocomplete.css';
import { allWordsApi } from '../apiService/wordsApi';

const Autocomplete = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      if(!inputValue || inputValue.length < 2) return;
      const result = await allWordsApi(inputValue)
      if(result && result.length) setSuggestions(result)
    };

    fetchWords();
  }, [inputValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSelect = (item) => {
    if(!item) return
    onSelect(item);
    setInputValue(''); 
    setSuggestions([]); 
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Start typing..."
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, i) => (
            <li
              key={i}
              onClick={() => handleSelect(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
