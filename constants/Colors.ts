import { myTheme } from "../theme";

const activeColorLight = myTheme["color-primary-500"];
const activeColorDark = '#fff';
const tintColorLight = myTheme["color-primary-500"];
//const tintColorLight = '#2f95dc';
const tintColorDark = myTheme["color-primary-200"];
//const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    specialText: activeColorLight,
    white: '#fff',
    gray: '#d3d3d3',
    lightblue: myTheme["color-info-300"],
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: activeColorLight,
    mapColor: "light",
    deepColorTint: myTheme["color-primary-600"]
  },
  dark: {
    lightblue: myTheme["color-info-300"],
    text: '#fff',
    specialText: '#fff',
    white: '#fff',
    gray: '#d3d3d3',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: activeColorLight,
    mapColor: "dark",
    deepColorTint: myTheme["color-primary-600"]
  },
};
