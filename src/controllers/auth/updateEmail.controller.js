import { User } from "../../models/user.model.js";

export const updateEmailController = async(req,res)=>{
    try {
        const email = req.body.email;
        const newEmail = req.body.newEmail;
        if(!email || !newEmail) throw new Error("please enter valid email id");
        const user = await User.findOne({email});
        if(!user) throw new Error("user is not existed");
        const updatedUser = await User.findByIdAndUpdate(user._id,{email:newEmail},{new:true,runValidators:true});
        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,message:error.message});
        
    }
    
}