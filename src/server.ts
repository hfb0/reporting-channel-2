import express from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';

import 'dotenv/config';
import './shared/database';
import './shared/container';
import userRoutes from './users/users.routes';
import sessionRoutes from './sessions/sessions.routes';
import complaintRouter from './complaints/complaint.routes';
import errorHandler from './shared/middlewares/error-handler';
import rateLimiter from './shared/middlewares/rate-limiter';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use('/complaints', complaintRouter);
app.use(errors());
app.use(errorHandler);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
