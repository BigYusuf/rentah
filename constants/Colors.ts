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
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: activeColorLight,
  },
  dark: {
    text: '#fff',
    specialText: '#fff',
    white: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: activeColorLight,
  },
};
