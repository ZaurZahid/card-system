import axios from "axios";

const baseURL = 'https://cardsystem.azurewebsites.net/api';

export const Axios = axios.create({
  baseURL,
  timeout: 60000,
});

