import express from 'express';
import userRouter from './routes/user.route.js';


const app = express();

//routes
app.use(express.json());
app.use('/api/v1',userRouter);

export default app;

