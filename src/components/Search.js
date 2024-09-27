import React, { useState } from 'react';
import BasicSearch from './BasicSearch';  // Component for normal search
import Autocomplete from './Autocomplete';  // Component for autocomplete search
import '../componentStyles/Search.css';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [isAutocomplete, setIsAutocomplete] = useState(false);
  const navigate = useNavigate();

  const searchModeBasic = () => {
    setIsAutocomplete(false);
  };

  const searchModeAutocomplete = () => {
    setIsAutocomplete(true);
  };

  const navigateToWord = (value) => {
    navigate(`/words/${value.word}`)
  }

  return (
    <div className="search-page">
      <h1>Search Words:</h1>
      <div className="search-page-tabs">
        <button onClick={searchModeBasic} className={`search-page-basic-button ${isAutocomplete}`}>Basic Search</button>
        <button onClick={searchModeAutocomplete} className={`search-page-basic-button ${!isAutocomplete}`}>Autocomplete Search</button>
      </div>

      {isAutocomplete ? <Autocomplete onSelect={navigateToWord}/> : <BasicSearch />}
    </div>
  );
};

export default Search;
