import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WordDetails = () => {
  const { word } = useParams();
  const [wordDetail, setWordDetail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/words/${word}`)
      .then(res => res.json())
      .then(data => setWordDetail(data));
  }, [word]);

  if (!wordDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{wordDetail.word}</h1>
      <p>Synonyms: {wordDetail.synonym.join(', ')}</p>
    </div>
  );
}

export default WordDetails;
