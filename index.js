const express = require('express');
const axios = require('axios');
const app = express();

const TMDB_BASE = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/tmdb/*', async (req, res) => {
  try {
    const path = req.params[0];
    const query = { ...req.query, api_key: API_KEY };
    const response = await axios.get(`${TMDB_BASE}/${path}`, { params: query });
    res.json(response.data);
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000);
