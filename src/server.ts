import express from 'express';
import 'dotenv/config';
import './database';

const app = express();

app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
