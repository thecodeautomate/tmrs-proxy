const axios = require('axios');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { path, ...query } = req.query;
  const tmdbPath = Array.isArray(path) ? path.join('/') : path;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${tmdbPath}`, {
      params: { ...query, api_key: process.env.TMDB_API_KEY },
    });
    res.json(response.data);
  } catch (e) {
    res.status(e.response?.status || 500).json({ error: e.message });
  }
}
