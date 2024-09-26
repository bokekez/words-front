import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { allWordsApi } from '../apiService/wordsApi';
import '../componentStyles/AllWords.css'; 

const AllWords = () => {
  const [words, setWords] = useState([]);  
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const fetchWords = async () => {
      const getWords = await allWordsApi(); 
      if (getWords) {
        setWords(getWords); 
        setLoading(false); 
      }
    };
    
    fetchWords();
  }, []);  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='all-words'>
      <h1>Word List</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Word</th>
            <th>Synonyms</th>
          </tr>
        </thead>
        <tbody>
          {words.length && words.map((word) => (
            <tr key={word.id}>
              <td>
                <Link to={`/words/${word.word}`}>{word.word}</Link>
              </td>

              <td>
                {word.synonym.slice(0, 7).map((synonym, i) => (
                  <span key={i}>
                    <Link to={`/words/${synonym}`}>{synonym}</Link>
                    {i < word.synonym.length - 1 && ', '}
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllWords;
