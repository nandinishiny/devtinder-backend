import express from 'express';
import authRouter from './routes/auth.routes.js';
import connectionRequestRouter from './routes/connectionRequest.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
));

//routes
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1',authRouter);
app.use('/api/v1',connectionRequestRouter);

export default app;

