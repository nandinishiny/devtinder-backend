import { ConnectionRequest } from "../../models/connectionRequest.model.js";

export const sentRequestsFeed = async(req,res)=>{
    try {
        const sentRequests = await ConnectionRequest.find({fromUserId:req.user._id,status:"interested"});
        if(sentRequests.length === 0) return res.status(200).json({success:true,message:"No sent requests found"});
        res.status(200).json({success:true,requestCount: sentRequests.length,sentRequests});
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        
    }
}