// import { Platform } from "react-native";

// let baseUrl= '';
// {
//     Platform.OS== 'android'? baseUrl= 'http://172.21.16.1:3000/api/v1/'
//     : baseUrl='http://localhost:3000/api/v1/'
// }

// export default baseUrl;


const hostIP = "https://b3d9-182-191-155-139.ngrok-free.app/";
let baseURL = `${hostIP}api/v1/`;//API IP address or domain

 //let baseURL = "http://172.23.144.1:3000/api/v1/";//API IP address or domain


export  {baseURL,hostIP};
