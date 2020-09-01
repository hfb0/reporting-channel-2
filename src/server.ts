import express from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import 'express-async-errors';

import 'dotenv/config';
import './shared/database';
import './shared/container';
import errorHandler from './shared/middlewares/error-handler';
import rateLimiter from './shared/middlewares/rate-limiter';
import routes from './routes';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => res.json({ message: 'Server running!' }));
app.use('/api/v1/', routes);
app.use(errors());
app.use(errorHandler);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
