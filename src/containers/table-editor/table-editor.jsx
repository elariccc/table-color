import { useState } from 'react';

import TableFormRow from './containers/table-form-row';
import TableRow from './containers/table-row';

import './table-editor.css';

export default function TableEditor({tableData, setTableData}) {
  const [ draggedIndex, setDraggedIndex ] = useState(null);

  return (
    <table className='table-editor'>
      <thead>
        <tr>
          <td/>
          <td>
            Name
          </td>
          <td>
            Type
          </td>
          <td>
            Color
          </td>
          <td/>
        </tr>
      </thead>
      <tbody>
        <TableFormRow setTableData={setTableData}/>
        {tableData ? tableData.map(
          (row, index) => (
            <TableRow
              key={index}
              row={row}
              index={index}
              setTableData={setTableData}
              draggedIndex={draggedIndex}
              setDraggedIndex={setDraggedIndex}
            />
          )
        ) : null}
      </tbody>
    </table>
  );
}