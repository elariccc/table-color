export default function TableInput({ value, handeInputChange, placeholder, type = 'text', step, min, max }) {
  return (
    <td>
      <input 
        type={type} 
        value={value}
        onChange={handeInputChange}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
      />
    </td>
  );
}