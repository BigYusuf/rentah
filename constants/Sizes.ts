import { Dimensions, Platform } from "react-native"


export const LISTMARGIN = 10;
export const WIDTH = Dimensions.get("screen").width - (LISTMARGIN * 2)

const baseHeight = 180;
const iosNotch = 40;
const iosHeight = baseHeight + iosNotch;
let andriodNotch = 0;
let andriodHeight = baseHeight + andriodNotch;

export const HEADERHEIGHT = Platform.OS ==="ios" ? iosHeight : andriodHeight;


const serverUrl = "http://192.168.43.241:5000/api"
const location = "/location"
const users = "/users"
const userEndpoint = serverUrl + users
const locationEndpoint = serverUrl + location

export const endpoints = {
  autoComplete: locationEndpoint + "/autocomplete",
  search: locationEndpoint + "/search",
  login: userEndpoint + "/login",
  register: userEndpoint + "/register",
  forgotPassword: userEndpoint + "/forgot-password",
}
