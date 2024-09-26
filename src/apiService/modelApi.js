
export const getActiveModel = async () => { 
  try {
    const response = await fetch('http://localhost:8000/modelSelector/activeModel');
    const data = await response.json();
    return data; 
  } catch (error) {
    return error;
  }
};

export const switchModel = async (model) => {
  try {
    const response = await fetch('http://localhost:8000/modelSelector/switchModel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        modelName: model
      }),
    });

    if (response.ok) {
      // showToastifySuccess(`${word} was added successfully!`, 'wordAdded');
      return model
    } 
    // const errorData = await response.json();
    // showToastifyError(`Error: ${errorData.message}`, 'addingError');
  } catch (error) {
    // showToastifyError('Failed to add word.', 'wentWrong');
  }
}
