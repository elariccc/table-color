import TableInput from '../../../../components/table-input';

export default function TableColorData({ rgb, color, setTableData, objIndex, modeIndex, setNewColorToTableData }) {
  const handeInputChange = event => {
    const newRgb = {
      ...rgb,
      ...{ [color]: event.target.value }
    }
    const newColorString = createColorString(newRgb);
    setNewColorToTableData(newColorString);
  }

  return (
    <TableInput
      value={rgb[color]}
      handeInputChange={handeInputChange}
    />
  );
}

function createColorString(rgb) {
  if (rgb.modeIndex === 0)
    return `#${formatHex(rgb.red)}${formatHex(rgb.green)}${formatHex(rgb.blue)}`;
  else if (rgb.modeIndex === 1)
    return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  else
    return `srgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
}

function formatHex(channel) {
  let newChannel = channel;
  if (channel.length === 0) newChannel = '  ' + newChannel;
  if (channel.length === 1) newChannel = ' ' + newChannel;
  if (channel.length > 2) newChannel = newChannel.slice(0, 2);
  return newChannel;
}