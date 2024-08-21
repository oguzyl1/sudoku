const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// API Endpoint Örneği
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
