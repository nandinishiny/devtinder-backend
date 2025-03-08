import { ConnectionRequest } from "../../models/connectionRequest.model.js";

export const acceptedRequestsController = async(req,res)=>{
    try {
        const publicFields = ["username","email"];
        const acceptedConnections = await ConnectionRequest.find({toUserId:req.user._id,status:"accepted"}).populate("fromUserId",publicFields).populate("toUserId",publicFields);
        if(acceptedConnections.length === 0) return res.status(200).json({success: true ,message:"No connection requests found"});
        const data = acceptedConnections.map(connection => {
            const fromUser = connection.fromUserId;
            const toUser = connection.toUserId;
            //since the request can be sent or requested right.
            if(fromUser._id.toString() === req.user._id.toString()){
                return toUser;
            }else{
                return fromUser;
            }
        })
        res.status(200).json({success:true, requestsCount: acceptedConnections.length,data});
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        
    }
}