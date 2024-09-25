import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const AllWords = () => {
  const [words, setWords] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    fetch('http://localhost:8000/words')
      .then(response => response.json())
      .then(data => {
        setWords(data);  
        setLoading(false);  
      })
      .catch(error => {
        console.error('Error fetching words:', error);
        setLoading(false);
      });
  }, []);  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Word List</h1>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            <Link to={word.word}>{word.word}</Link>
            <p>Synonyms:</p>
            {word.synonym.map(synonym => (
              <div>
                <Link to={synonym}>{synonym}</Link>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllWords;
