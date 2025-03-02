import { User } from "../../models/user.model.js";
//updating user //for this user must be logged in.
export const updateUserController = async(req,res)=>{
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
