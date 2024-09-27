import React, { useContext, useEffect } from 'react';
import { getActiveModel, switchModel } from '../apiService/modelApi';
import '../componentStyles/Model.css';
import { ModelContext } from '../context/modelContext';

const Model = () => {
  const { model, setModel } = useContext(ModelContext);

  useEffect(() => {
    const getModel = async () => {
      const result = await getActiveModel()
      if(result) {
        setModel(result);
      }
    };

    getModel()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model])

  const handleModelChange = (value) => {
    switchModel(value)
    setModel(value)
  }

  return (
    <div className="model">
      <p>Active Model:</p>
      <div>
        <button className={`${model === 'basic' ? 'active' : ''}`} onClick={() => handleModelChange('basic')}>Basic</button>
        <button className={`${model === 'transitive' ? 'active' : ''}`} onClick={() => handleModelChange('transitive')}>Transitive</button>
      </div>
    </div>
  )
}

export default Model;
