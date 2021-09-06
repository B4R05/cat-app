import axios from 'axios';

export const uploadAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  method: 'post',
  headers: {
    'Content-Type': 'form-data',
    'X-API-Key': process.env.REACT_APP_API_KEY
  }
});

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.REACT_APP_API_KEY
  }
});

