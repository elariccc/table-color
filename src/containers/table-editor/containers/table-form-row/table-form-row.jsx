import { useState } from 'react';

import TableFormData from '../../../../components/table-form-data';

import { deepClone } from '../../../../functions';

import './table-form-row.css';

const emptyRow = {
  name: '',
  type: '',
  color: ''
};

export default function TableFormRow({ setTableData }) {
  const [ row, setRow ] = useState(emptyRow);

  const handleInsertClick = () => {
    setTableData(
      oldData => {
        const newData = deepClone(oldData);
        
        newData.splice(0, 0, {...row});

        return newData;
      }
    );

    setRow(emptyRow);
  }

  return (
    <tr>
      <td/>
      <TableFormData
        obj={row}
        property='name'
        setObj={setRow}
        placeholder='Type name...'
      />
      <TableFormData
        obj={row}
        property='type'
        setObj={setRow}
        placeholder='Type type...'
      />
      <TableFormData
        obj={row}
        property='color'
        setObj={setRow}
        placeholder='Type color...'
      />
      <td
        onClick={handleInsertClick}
        className='table-form-row__insert-cell'
      >insert</td>
    </tr>
  );
}