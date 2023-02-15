import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_APP_URL } = getEnvVariables();
console.log("VITE: ", VITE_APP_URL);
const calendarApi = axios.create({
	baseURL: VITE_APP_URL,
});

//TODO: configurar interceptores
//Todas las periciones enviaran el token
calendarApi.interceptors.request.use((config) => {
	config.headers = {
		...config.headers,
		"x-token": localStorage.getItem("token"),
	};
	return config;
});

export default calendarApi;
