import express from 'express';
import dotenv from 'dotenv';
import goalRouter from './routes/goalRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use('/api/goals', goalRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
