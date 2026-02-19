import axios from 'axios';

const API_KEY = '139b9285';
console.log('OMDB API Key loaded:', API_KEY);

const omdb = axios.create({
  baseURL: 'https://www.omdbapi.com',
  params: {
    apikey: API_KEY,
    type: 'movie'
  }
});

export default omdb;
