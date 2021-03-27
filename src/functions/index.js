export function deepClone(item) {
  if (Array.isArray(item)) return item.map(element => deepClone(element));
  
  if (typeof item === 'object') {
    const clonedItem = {};

    for (const property in item) {
      clonedItem[property] = deepClone(item[property]);
    }

    return clonedItem;
  }

  return item;
}

export function rgbToHsl(rgb, currentHue = 0) {
  const redFraction = rgb.red / 255;
  const greenFraction = rgb.green / 255;
  const blueFraction = rgb.blue / 255;

  const minChannel = Math.min(redFraction, greenFraction, blueFraction);
  const maxChannel = Math.max(redFraction, greenFraction, blueFraction);
  const delta = maxChannel - minChannel;

  let hue, saturation, lightness;

  if ( delta === 0 ) 
    hue = currentHue / 60;
  else if (maxChannel === redFraction) 
    hue = ( (greenFraction - blueFraction) / delta ) % 6;
  else if (maxChannel === greenFraction)
    hue = (blueFraction - redFraction) / delta + 2;
  else
    hue = (redFraction - greenFraction) / delta + 4;

  hue = hue * 60;

  if (hue < 0) hue += 360;

  lightness = (maxChannel + minChannel) / 2;

  saturation = delta === 0 ? 0 : delta / ( 1 - Math.abs(2 * lightness - 1) );

  saturation = saturation * 100;
  lightness = lightness * 100;

  return { 
    hue: hue, 
    saturation: saturation, 
    lightness: lightness
  }
}

export function hslToRgb(hsl) {
  const hue = hsl.hue;
  const saturationFraction = hsl.saturation / 100;
  const lightnessFraction = hsl.lightness / 100;

  const c = ( 1 - Math.abs(2 * lightnessFraction - 1) ) * saturationFraction;
  const x = c * ( 1 - Math.abs((hue / 60) % 2 - 1) );
  const m = lightnessFraction - c / 2;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (0 <= hue && hue < 60) {
    red = c; green = x; blue = 0;
  } else if (60 <= hue && hue < 120) {
    red = x; green = c; blue = 0;
  } else if (120 <= hue && hue < 180) {
    red = 0; green = c; blue = x;
  } else if (180 <= hue && hue < 240) {
    red = 0; green = x; blue = c;
  } else if (240 <= hue && hue < 300) {
    red = x; green = 0; blue = c;
  } else if (300 <= hue && hue < 360) {
    red = c; green = 0; blue = x;
  }

  red = Math.round( (red + m) * 255 );
  green = Math.round( (green + m) * 255 );
  blue = Math.round( (blue + m) * 255 );
  return {
    red: red,
    green: green,
    blue: blue
  }
}

export function decToHex(number) {
  let hexString = number.toString(16);
  if (hexString.length % 2) {
    hexString = '0' + hexString;
  }
  return hexString;
}