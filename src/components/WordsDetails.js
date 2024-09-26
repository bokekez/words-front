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

  console.log(wordDetail)

  return (
    <div className="word-details">
    <h1>{wordDetail.word}</h1>
      <h3>Synonyms:</h3>
      <div>
      {wordDetail.synonym.map(syn => (
        <Link className="word-details-link" to={`/words/${syn}`}>{syn}</Link>
      ))}
      </div>
      <h3>{wordDetail.transitive ? 'Transitive Synonyms:' : ''}</h3>
      {wordDetail.transitive && wordDetail.transitive.map(tran => (
        <Link className="word-details-link" to={`/words/${tran}`}>{tran}</Link>
      ))
      }
    </div>
  );
}

export default WordDetails;
