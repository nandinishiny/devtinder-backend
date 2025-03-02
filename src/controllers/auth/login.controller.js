import validator from 'validator';
import { User } from '../../models/user.model.js';
export const loginController = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email){
            throw new Error("please enter email");
        }
        if(!validator.isEmail(email)){
            throw new Error("please enter valid email");
        } 
        if(!password){
            throw new Error("please enter password");
        } 
        const user = await User.findOne({email});
        if(!user) throw new Error("user is not found. please register");
        const isPasswordValid = await user.validatePassword(password);
        //these are instance method. these attached to document. so no need to import.
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) throw new Error("password is incorrect");
        //token generation and sending it to the user. via cookies.                                                         
        // res.cookie('token', 'valid-me', {httpOnly: true,  expires: new Date(Date.now() + 8 * 3600000) }); //8 hours 
        // res.status(200).json({success: true, message: "login successfull"});
        //we can write it like this too.
        // const jwt_token = jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn: "8h"});
        //we are using mongodb instance method.
        const jwt_token = await user.getJWT();

        res.status(200).cookie('token', jwt_token, {httpOnly: true,  expires: new Date(Date.now() + 8 * 3600*1000) }).json({success: true, message: "login successfull"});
}catch(error){
    res.status(400).json({ 
        success: false, 
        message: error.message || "Something went wrong" 
    });
}}