import React from 'react';
import '../componentStyles/EditDelete.css';
import { deleteWord } from '../apiService/wordsApi';
import { useNavigate } from 'react-router-dom';

const Delete = ({ wordParam: word, onClose }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    onClose(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const result = await deleteWord(word);
    if (result) navigate(`/words/`);
  };

  return (
    <div className="full-screen" onClick={handleCancel}>
      <div className="full-screen-form">
        <h3>Are you sure you want to delete {word}</h3>
        <div className="full-screen-form-buttons">
          <button className="full-screen-cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="full-screen-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
