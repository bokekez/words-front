import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getWordDetails } from '../apiService/wordsApi';
import '../componentStyles/WordDetails.css'
import editPng from '../resources/edit.png'
import deletePng from '../resources/delete.png'
import Delete from './Delete';
import Edit from './Edit';

const WordDetails = () => {
  const { word } = useParams();
  const [wordDetail, setWordDetail] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [editDialog, setEditDialog] = useState(false)

  useEffect(() => {
    const fetchWordDetails = async () => {
      const result = await getWordDetails(word)
      setWordDetail(result)
    }
    
    fetchWordDetails()
  }, [word]);

  const handleDelete = () =>{
    setDeleteDialog(true)
  }

  const handleEdit = () =>{
    setEditDialog(true)
  }

  const handleFormClose = () => {
    setDeleteDialog(false)
    setEditDialog(false)
  }

  if (!wordDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="word-details">
    <h1>{wordDetail.word}</h1>
      <div className="word-details-buttons">
        <button onClick={handleEdit} className="word-details-button">
          Edit
          <img src={editPng} alt="Edit" className="word-details-edit"/>
        </button>
        <button onClick={handleDelete} className="word-details-button">
          Delete
          <img src={deletePng} alt="Delete" className="word-details-edit"/>
        </button>
      </div>
      <h3>Synonyms:</h3>
      <div>
      {wordDetail.synonym.map((syn, i) => (
        <Link className="word-details-link" to={`/words/${syn}`} key={i}>{syn}</Link>
      ))}
      </div>
      <h3>{wordDetail.transitive ? 'Transitive Synonyms:' : ''}</h3>
      {wordDetail.transitive && wordDetail.transitive.map((tran, i) => (
        <Link className="word-details-link" to={`/words/${tran}`} key={i}>{tran}</Link>
      ))
      }
      {deleteDialog && (
        <Delete wordParam={wordDetail.word} onClose={handleFormClose}/>
      )}
      {editDialog && (
        <Edit wordParam={wordDetail} onClose={handleFormClose}/>
      )}
    </div>
  );
}

export default WordDetails;
