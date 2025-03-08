import { ConnectionRequest } from "../../models/connectionRequest.model.js";
import { User } from "../../models/user.model.js";

export const connectionRequest = async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status; 
        //he said we are building dynamic api for both interested and ignored.
        // /request/send/:status/:toUserId
        const allowedStatus = ['interested','ignored'];
        if(!allowedStatus.includes(status)) return res.status(400).json({success:false,message:"Invalid status"});
        //checking if the to user exists or not.
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({success:false,message:"User not found"});
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({$or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]});
        //no existing request from both sides, that's why we are using mongodb operator.
        if(existingConnectionRequest){
            return res.status(400).json({success: true, message:"You have already sent connection Request"})
        }
        const newConnectionRequest = await ConnectionRequest.create({ fromUserId, toUserId, status });

        // Populate immediately
        const data = await ConnectionRequest.findById(newConnectionRequest._id)
        .populate("toUserId", "username email")
        .populate("fromUserId", "username email");
        //first we save and after that we can use populate.
        //or else we can write using create too.
        // const connectionRequest = await ConnectionRequest.create({fromUserId,toUserId,status}).populate("fromUserId","username email")
        res.status(201).json({success:true,message:"Connection request sent successfully",data});
    } catch (error) {
        res.status(400).json({success:true,message:error.message})    
    }
}