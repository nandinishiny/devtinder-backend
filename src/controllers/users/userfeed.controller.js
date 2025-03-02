import { User } from "../../models/user.model.js";

//getting all users in feed
export const getUsersController = async(req,res)=>{
    try {
        const users = await User.find({});//we can even make it as User.find(), no need of braces too.
        //this is resulting an array for me. 
        res.status(200).json({userCount:users.length,users});   
    } catch (error) {
        console.log("The error is "+error)
        res.status(400).send("please fill the details correctly")
        
    }
}
