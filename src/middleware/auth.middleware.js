import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
export const userAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token) throw new Error("please login first");
        const decodede_message = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const userId = decodede_message._id;
        const user = await User.findById(userId);
        req.user = user; //we are storing the user in req object so that we can use it in other middlewares.
        next();
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }
}