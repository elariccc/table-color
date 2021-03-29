import TableInput from '../table-input';

export default function TableFormData({ obj, property, setObj, placeholder, className }) {
  const handeInputChange = event => {
    setObj(
      oldObj => {
        const newValues = { [property]: event.target.value };

        return {...oldObj, ...newValues};
      }
    );
  }

  return (
    <TableInput
      value={obj[property]}
      handeInputChange={handeInputChange}
      placeholder={placeholder}
      className={className}
    />
  );
}