import express from 'express';
import 'dotenv/config';
import './database';
import userRoutes from './users/users.routes';
import sessionRoutes from './sessions/sessions.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
