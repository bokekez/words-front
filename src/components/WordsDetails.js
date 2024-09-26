import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getWordDetails } from '../apiService/wordsApi';
import '../componentStyles/WordDetails.css'

const WordDetails = () => {
  const { word } = useParams();
  const [wordDetail, setWordDetail] = useState(null);

  useEffect(() => {
    const fetchWordDetails = async () => {
      const result = await getWordDetails(word)
      setWordDetail(result)
    }
    
    fetchWordDetails()
  }, [word]);

  if (!wordDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="word-details">
    <h1>{wordDetail.word}</h1>
      <h3>Synonyms:</h3>
      <div>
      {wordDetail.synonym.map(syn => (
        <Link className="word-details-link" to={`/words/${syn}`}>{syn}</Link>
      ))}
      </div>
    </div>
  );
}

export default WordDetails;
