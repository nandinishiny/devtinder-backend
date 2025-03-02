import { User } from "../../models/user.model.js";

export const deleteUserController = async(req,res)=>{
    try {
        const userId = req.query._id;
        if(!userId) return res.status(400).send("user is not found")
        const user = await User.findById(userId);
        if(!user) return res.status(400).send("user is not existed")
        await User.findByIdAndDelete(userId);
        res.status(200).json({success: true ,message:"user deleted successfully"});
               
        
    } catch (error) {
        console.log(error);
        res.status(400).send("user not found")
        
    }
}