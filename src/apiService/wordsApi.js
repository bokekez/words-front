import { showToastifySuccess, showToastifyError } from '../utils/toast';
const API_URL = process.env.REACT_APP_API_URL;

export const allWordsApi = async (params) => {
  if(params) return getAllWordsSearch(params)
    
  try {
    const response = await fetch(`${API_URL}/words`);
    const data = await response.json();
    return data; 
  } catch (error) {
    showToastifyError(`Error: ${error}`, 'getAllError');
    return error;
  }
};

export const addWordApi = async (word, synonym) => {
  try {
    const response = await fetch(`${API_URL}/words`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        word,
        synonym: synonym, 
      }),
    });

    if (response.ok) {
      showToastifySuccess(`${word} was added successfully!`, 'wordAdded');
      return true
    } 
    const errorData = await response.json();
    showToastifyError(`Error: ${errorData.message}`, 'addingError');
  } catch (error) {
    showToastifyError('Failed to add word.', 'wentWrong');
  }
}

const getAllWordsSearch = async (search) => {
  try {
    const params = `${encodeURIComponent(search)}`
    const response = await fetch(`${API_URL}/words?search=${params}`);
    const data = await response.json();
    if(data.message){
      // showToastifyError(`Failed to fetch words because ${data.message}`, 'fetchError');
      return null
    } 
    return data
  } catch (error) {
    showToastifyError(`Failed to fetch words because ${error.message}`, 'fetchError');
  }
}

export const getWordDetails = async (word) => {
  try{
    const response = await fetch(`${API_URL}/words/${word}`)
    const data = await response.json();
    if(data.message){
      showToastifyError(`Failed to fetch words because ${data.message}`, 'fetchError');
      return null
    } 
    return data;
  } catch (error) {
    showToastifyError(`Failed to fetch words because ${error.message}`, 'fetchError');
  }
}