import bcrypt from 'bcrypt';
import validateSignupData from '../../utils/validation.js';
import { User } from '../../models/user.model.js';

//pushing a new user into database, db will be in other continent. so use async.
export const registerController = async(req,res)=>{
    try {
        const {username,email,password,gender,age,skills,photoUrl} = req.body;
        //first validate the data , after that encrypt it.
        //for validating we use a helper file which is in utils.
        validateSignupData(req.body);
        //for encrypting we use bcrypt.
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({username,email,password:passwordHash,gender,age,skills,photoUrl}); //we are creating a new instance of user model. 
        res.status(200).json(user);
        
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: error.message || "Something went wrong" 
        });
    }

}
//but telling where the error is there is a bad practice.