import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.get('/api/goals', (req, res) => {
  res.json({
    message: 'API working',
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
