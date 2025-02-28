import {User} from '../models/user.model.js';
//pushing a new user into database, db will be in other continent. so use async.
const registerController = async(req,res)=>{
    try {
        const {username,email,password,gender,age,skills,photoUrl} = req.body;
        const user = await User.create({username,email,password,gender,age,skills,photoUrl}); //we are creating a new instance of user model.
        res.status(200).json(user);
        
    } catch (error) {
        console.log("The error is "+error)
        res.status(400).send("please fill the details correctly")
        
    }

}
//getting all users in feed
const getUsersController = async(req,res)=>{
    try {
        const users = await User.find({});//we can even make it as User.find(), no need of braces too.
        //this is resulting an array for me. 
        res.status(200).json({userCount:users.length,users});   
    } catch (error) {
        console.log("The error is "+error)
        res.status(400).send("please fill the details correctly")
        
    }
}
//updating user //for this user must be logged in.
const updateUserController = async(req,res)=>{
    try {
        const allowedUpdates = ["username","password","age","gender"]; //we are not allowing to update email. here.
        const isUpdateAllowed = Object.keys(req.body).every(field=>allowedUpdates.includes(field));
        //Object.keys(req.body) will give all the keys in the body of the request.
        //Object.keys will save it in as an array.
        //every will check whether all the keys are present in allowedUpdates or not.
        //if any one of the key is not present in allowedUpdates, then it will return
        //false. so we are checking whether all the keys are present in allowedUpdates or not.
        if(!isUpdateAllowed) throw new Error("Invalid updates");
        const userId = req.body._id;
        if(!userId) throw new Error("user is not found");
        const user = await User.findById(userId);
        // if(!user) return res.status(400).send("user is not existed");
        if(!user) throw new Error("user is not existed");
        const updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true,runValidators: true})
        res.status(200).json(updatedUser);    
    } catch (error) {
        console.log(error);
        res.status(400).send("please fill the details correctly")
        
    }

}
//deleting User
const deleteUserController = async(req,res)=>{
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
const updateEmailController = async(req,res)=>{
    try {
        const email = req.body.email;
        const newEmail = req.body.newEmail;
        if(!email && !newEmail) return res.status(400).send("please enter valid email id");
        const user = await User.findOne({email});
        if(!user) return res.status(400).send("user is not existed");
        updatedUser = await User.findByIdAndUpdate(user._id,{email:newEmail},{new:true,runValidators:true});
        res.status(200).json(updatedUser);
        
    } catch (error) {
        console.log(error);
        res.status(400).send("user not found")
        
    }
    
}
export {registerController,getUsersController,updateUserController,deleteUserController,updateEmailController};