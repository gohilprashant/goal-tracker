import express from 'express';
import dotenv from 'dotenv';
import goalRouter from './routes/goalRoutes.js';
import userRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { connectDB } from './config/db.js';
import path from 'path';

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/api/goals', goalRouter);
app.use('/api/users', userRouter);

const __dirname = path.resolve();

// serve frontend

app.use(express.static(path.join(__dirname, '/frontend/build')));
console.log(__dirname);

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
