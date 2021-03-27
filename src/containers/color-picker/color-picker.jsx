import React, { useState } from 'react';

import TableColorData from './components/table-color-data';

import { deepClone, rgbToHsl, hslToRgb, decToHex } from '../../functions';

import './color-picker.css';

export default function ColorPicker({ obj, objIndex, setTableData }) {
  const [ isMenuActive, setIsMenuActive ] = useState(false);
  let menuClasses = 'color-picker__menu';
  let overlayClasses = 'color-picker__overlay';
  if (isMenuActive) {
    menuClasses += ' color-picker__menu--active';
    overlayClasses += ' color-picker__overlay--active';
  }

  const [ isPickingColor, setIsPickingColor ] = useState(false);
  const [ currentHue, setCurrentHue ] = useState(0);
  let modeIndex = null;

  const rgb = {};
  const notConvertedRgb = {};
  const colorString = obj.color;

  if (colorString.indexOf('#') === 0 && colorString.length <= 7) {
    modeIndex = 0;
    notConvertedRgb.modeIndex = modeIndex;

    notConvertedRgb.red = colorString.slice(1, 3).replace(/\s/g, '');
    notConvertedRgb.green = colorString.slice(3, 5).replace(/\s/g, '');
    notConvertedRgb.blue = colorString.slice(5, 7).replace(/\s/g, '');

    rgb.red = parseInt(!notConvertedRgb.red ? +notConvertedRgb.red : notConvertedRgb.red, 16);
    rgb.green = parseInt(!notConvertedRgb.green ? +notConvertedRgb.green : notConvertedRgb.green, 16);
    rgb.blue = parseInt(!notConvertedRgb.blue ? +notConvertedRgb.blue : notConvertedRgb.blue, 16);
  }

  if (colorString.indexOf('rgb(') === 0) {
    modeIndex = 1;
    notConvertedRgb.modeIndex = modeIndex;

    let cuttedString = colorString.slice(4);
    notConvertedRgb.red = cuttedString.slice(0, cuttedString.indexOf(',')).replace(/\s/g, '');
    
    cuttedString = cuttedString.slice(cuttedString.indexOf(',') + 1);
    notConvertedRgb.green = cuttedString.slice(0, cuttedString.indexOf(',')).replace(/\s/g, '');
    
    cuttedString = cuttedString.slice(cuttedString.indexOf(',') + 1);
    notConvertedRgb.blue = cuttedString.slice(0, cuttedString.indexOf(',')).replace(/\s/g, '');

    rgb.red = parseInt(!notConvertedRgb.red ? +notConvertedRgb.red : notConvertedRgb.red);
    rgb.green = parseInt(!notConvertedRgb.green ? +notConvertedRgb.green : notConvertedRgb.green);
    rgb.blue = parseInt(!notConvertedRgb.blue ? +notConvertedRgb.blue : notConvertedRgb.blue);
  }

  if (colorString.indexOf('srgb(') === 0) {
    modeIndex = 2;
    notConvertedRgb.modeIndex = modeIndex;

    let cuttedString = colorString.slice(5);
    notConvertedRgb.red = cuttedString.slice(0, cuttedString.indexOf(',')).replace(/\s/g, '');
    
    cuttedString = cuttedString.slice(cuttedString.indexOf(',') + 1);
    notConvertedRgb.green = cuttedString.slice(0, cuttedString.indexOf(',')).replace(/\s/g, '');
    
    cuttedString = cuttedString.slice(cuttedString.indexOf(',') + 1);
    notConvertedRgb.blue = cuttedString.slice(0, cuttedString.indexOf(',')).replace(/\s/g, '');
    
    rgb.red = Math.floor( parseFloat(!notConvertedRgb.red ? +notConvertedRgb.red : notConvertedRgb.red) * 255 );
    rgb.green = Math.floor( parseFloat(!notConvertedRgb.green ? +notConvertedRgb.green : notConvertedRgb.green) * 255 );
    rgb.blue = Math.floor( parseFloat(!notConvertedRgb.blue ? +notConvertedRgb.blue : notConvertedRgb.blue) * 255 );
  }

  const stringValidation =
    (
      modeIndex !== null &&
      rgb.red >= 0 && rgb.red <= 255 && !isNaN(rgb.red) &&
      rgb.green >= 0 && rgb.green <= 255 && !isNaN(rgb.green) &&
      rgb.blue >= 0 && rgb.blue <= 255 && !isNaN(rgb.blue)
    ) ? true : false
  ;

  if (!stringValidation) {
    modeIndex = 1;
    Object.assign(rgb, {red: 255, green: 0, blue: 0})
    Object.assign(notConvertedRgb, rgb, { modeIndex: modeIndex });
  }

  const hsl = rgbToHsl(rgb, currentHue);

  const pickStyle = 
    stringValidation ? 
      { 
        backgroundColor: createColorString(rgb) 
      } 
    : null
  ;

  const pointerStyle = {
    left: `${hsl.saturation}%`,
    top: `${-(hsl.lightness + hsl.saturation / 2 - 100) / (1 - hsl.saturation / 200)}%`,
  };

  const fieldStyle = {
    background:  createFieldGradientByHue(hsl.hue)
  };

  const setNewColorToTableData = newColorString => {
    setTableData(
      oldData => {
        const oldObj = oldData[objIndex];
        
        const newValues = { color: newColorString };
        const newObj = {...oldObj, ...newValues};
  
        const newData = deepClone(oldData);
        newData.splice(objIndex, 1, newObj);
  
        return newData;
      }
    );
  }

  const handleRangeChange = event => {
    const newHue = +event.target.value;
    
    setCurrentHue(newHue);
    const newHsl = {
      ...hsl,
      ...{ hue: newHue }
    };

    const newRgb = hslToRgb(newHsl);
    const newColorString = createColorString(newRgb, modeIndex);
    setNewColorToTableData(newColorString);
  };

  const setPickedColor = event => {
    const newSaturation = event.nativeEvent.offsetX / event.target.offsetWidth * 100;
    const newLightness = (50 + (1 - event.nativeEvent.offsetX / event.target.offsetWidth) * 50) * (1 - event.nativeEvent.offsetY / event.target.offsetHeight);
  
    const newHsl = {
      hue: hsl.hue,
      saturation: newSaturation,
      lightness: newLightness,
    };
  
    const newRgb = hslToRgb(newHsl);
    const newColorString = createColorString(newRgb, modeIndex);
    setNewColorToTableData(newColorString);
  }

  const handleFieldMouseDown = event => {
    setIsPickingColor(true);
    setPickedColor(event);
  }

  const handleFieldMouseMove = event => {
    if (isPickingColor) setPickedColor(event);
  }

  const handleFieldStopPicking = event => {
    setIsPickingColor(false);
  }

  const handleModeClick = () => {
    const newModeIndex = modeIndex < modes.length - 1 ? (modeIndex + 1) : 0;
    const newColorString = createColorString(rgb, newModeIndex);
    setNewColorToTableData(newColorString);
  }

  return (
    <React.Fragment>
      <div 
        className={overlayClasses}
        onClick={() => setIsMenuActive(false)}
      />
      <div className='color-picker'>
        <button 
          className='color-picker__pick'
          style={pickStyle}
          onClick={() => setIsMenuActive(true)}
        />
        <div className={menuClasses}>
          <div 
            className='color-picker__field'
            style={fieldStyle}
            onMouseDown={handleFieldMouseDown}
            onMouseMove={handleFieldMouseMove}
            onMouseUp={handleFieldStopPicking}
            onMouseLeave={handleFieldStopPicking}
          >
            <div 
              className='color-picker__pointer'
              style={pointerStyle}
            />
          </div>
          <input 
            className='color-picker__hue-range'
            type='range' 
            min='0'
            max='359'
            step='any'
            onChange={handleRangeChange}
            value={hsl.hue}
          />
          <table>
            <thead>
              <tr>
                <td>
                  R
                </td>
                <td>
                  G
                </td>
                <td>
                  B
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableColorData
                  rgb={notConvertedRgb}
                  color='red'
                  setTableData={setTableData}
                  objIndex={objIndex}
                  modeIndex={modeIndex}
                  setNewColorToTableData={setNewColorToTableData}
                />
                <TableColorData
                  rgb={notConvertedRgb}
                  color='green'
                  setTableData={setTableData}
                  objIndex={objIndex}
                  modeIndex={modeIndex}
                  setNewColorToTableData={setNewColorToTableData}
                />
                <TableColorData
                  rgb={notConvertedRgb}
                  color='blue'
                  setTableData={setTableData}
                  objIndex={objIndex}
                  modeIndex={modeIndex}
                  setNewColorToTableData={setNewColorToTableData}
                />
              </tr>
            </tbody>
          </table>
          <button
            className='color-picker__mode'
            onClick={handleModeClick}
            type='button'
          >
            {modes[modeIndex]}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

const modes = ['Hex', 'RGB', 'sRGB'];

function createFieldGradientByHue(hue) {
  return `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
          linear-gradient(to right, white, hsl(${Math.round(hue)}, 100%, 50%)`;
}

function createColorString(rgb, modeIndex = 0) {
  if (modeIndex === 0)
    return `#${decToHex(rgb.red)}${decToHex(rgb.green)}${decToHex(rgb.blue)}`;
  else if (modeIndex === 1)
    return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  else
    return `srgb(${(rgb.red / 255).toFixed(3)}, ${(rgb.green / 255).toFixed(3)}, ${(rgb.blue / 255).toFixed(3)})`;
}