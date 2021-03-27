import TableInput from '../../../../components/table-input';

import { deepClone } from '../../../../functions';

export default function TableDataEditable({ obj, property, objIndex, setTableData }) {
  const handeInputChange = event => {
    setTableData(
      oldData => {
        const oldObj = oldData[objIndex];
        const newValues = { [property]: event.target.value };
        const newObj = {...oldObj, ...newValues};

        const newData = deepClone(oldData);
        newData.splice(objIndex, 1, newObj);

        return newData;
      }
    );
  }

  return (
    <TableInput
      value={obj[property]}
      handeInputChange={handeInputChange}
    />
  );
}