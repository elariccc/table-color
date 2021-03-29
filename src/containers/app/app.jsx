import React, { useEffect, useState } from 'react';

import TableEditor from '../table-editor';

import { deepClone } from '../../functions';
import { DEFAULT_TABLE_DATA, LOCAL_STORAGE_KEY } from '../../data';

import './app.css';

const initialTableData = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));

export default function App() {
  const [ tableData, setTableData ] = useState(initialTableData || []);

  //Update local storage
  useEffect(
    () => {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(tableData)
      );
    },
    [tableData]
  );

  const setDefaultTableData = () => {
    setTableData(deepClone(DEFAULT_TABLE_DATA));
  };

  return (
    <div className='app'>
      <button 
        type='button' 
        onClick={setDefaultTableData}
        className='app__set-default-button set-default-button'
      >
        <i class="fas fa-redo-alt"></i>
        Set default table data
      </button>
      <TableEditor
        tableData={tableData}
        setTableData={setTableData}
      />
    </div>
  );
}