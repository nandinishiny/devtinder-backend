import { ConnectionRequest } from "../../models/connectionRequest.model.js";

//these can be done by a user who can 
export const reviewRequestController = async(req, res) => {
    try {
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(req.params.status)){
            return res.status(400).json({success:false,message:"Invalid status"});
        }
        const connectionRequest = await ConnectionRequest.findOne({_id:req.params.requestId,status:"interested",toUserId:req.user._id})
        if(!connectionRequest){
            return res.status(404).json({success:false,message:"Request not found"});
        }
        /*  if(connectionRequest.status !== "interested"){
            return res.status(400).json({success:false,message:"You can only review the request with status interested"});
        }*/
        connectionRequest.status = req.params.status;
        await connectionRequest.save();
        res.status(200).json({success:true,message:"Request reviewed successfully"});

        
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        
    }
}