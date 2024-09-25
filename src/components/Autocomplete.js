import React, { useState, useEffect } from 'react';
import '../componentStyles/Autocomplete.css';
import { showToastifyError } from '../utils/toast';

const Autocomplete = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchWords = async () => {
      if(!inputValue || inputValue.length < 2) return;
      try {
        const params = `${encodeURIComponent(inputValue)}`
        const response = await fetch(`http://localhost:8000/words?search=${params}`);
        const data = await response.json();
        setSuggestions(data.map(word => word.word));
      } catch (error) {
        showToastifyError('Failed to fetch words.', 'fetchError');
      }
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
