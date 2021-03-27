import React, { useEffect, useState } from 'react';

import TableEditor from '../table-editor';

import { deepClone } from '../../functions';
import { DEFAULT_TABLE_DATA, LOCAL_STORAGE_KEY } from '../../data';

import './app.css';

export default function App() {
  const [ tableData, setTableData ] = useState(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY)));

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
    <React.Fragment>
      <button type='button' onClick={setDefaultTableData}>
        Set default table data
      </button>
      <TableEditor
        tableData={tableData}
        setTableData={setTableData}
      />
    </React.Fragment>
  );
}