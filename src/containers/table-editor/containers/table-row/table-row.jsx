import { useRef, useState } from 'react';

import TableDataEditable from '../../components/table-data-editable';
import ColorPicker from '../../../color-picker';

import { deepClone } from '../../../../functions';

import './table-row.css';

export default function TableRow({ row, index, setTableData, draggedIndex, setDraggedIndex }) {
  const [ isDraggedOver, setIsDraggedOver ] = useState(false);
  const parrentOfDraggedEl = useRef(null);

  let tableRowClasses = 'table-row';
  tableRowClasses += ( index === draggedIndex ) ? ' table-row--dragged' : '';
  tableRowClasses += 
    isDraggedOver ?
      (
        ( index < draggedIndex ) ?
          ' table-row--dragged-over-top' 
        :
          ' table-row--dragged-over-bottom' 
      )
    : ''
  ;

  const handleDragStart = event => {
    setDraggedIndex(index);

    event.dataTransfer.setDragImage(
      document.createElement('div'),
      0,
      0
    );
  };

  const handleDragEnd = event => {
    setDraggedIndex(null);
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    if (index !== draggedIndex) setIsDraggedOver(true);
  };

  const handleDragLeave = event => {
    if (index !== draggedIndex) setIsDraggedOver(false);
  }

  const handleDrop = event => {
    setIsDraggedOver(false);

    if (index !== draggedIndex) setTableData(
      prevTableData => {
        const newTableData = deepClone(prevTableData);
        newTableData.splice(index, 0, newTableData.splice(draggedIndex, 1)[0]);

        return newTableData;
      }
    )
  };
  
  const handleDeleteClick = () => {
    setTableData(
      oldData => {
        const newData = deepClone(oldData);
        newData.splice(index, 1);

        return newData;
      }
    );
  };

  return (
    <tr 
      className={tableRowClasses}
      ref={parrentOfDraggedEl}
    >
      <td 
        className='table-row__drag-cell'
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >drag</td>
      <TableDataEditable
        obj={row}
        property='name'
        objIndex={index}
        setTableData={setTableData}
      />
      <TableDataEditable
        obj={row}
        property='type'
        objIndex={index}
        setTableData={setTableData}
      />
      <TableDataEditable
        obj={row}
        property='color'
        objIndex={index}
        setTableData={setTableData}
      />
      <td>
        <ColorPicker
          obj={row}
          objIndex={index}
          setTableData={setTableData}
        />
      </td>
      <td
        onClick={handleDeleteClick}
        className='table-row__delete-cell'
      >delete</td>
    </tr>
  );
}