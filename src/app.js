import express from 'express';
import authRouter from './routes/auth.routes.js';
import connectionRequestRouter from './routes/connectionRequest.routes.js';
import cookieParser from 'cookie-parser';


const app = express();

//routes
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1',authRouter);
app.use('/api/v1',connectionRequestRouter);

export default app;

