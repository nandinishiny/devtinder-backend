import { ConnectionRequest } from "../../models/connectionRequest.model.js";
import {User} from "../../models/user.model.js";

export const recievedRequestsController = async(req,res)=>{
    try {
        const myConnectionRequests = await ConnectionRequest.find({toUserId:req.user._id,status:"interested"}).populate("fromUserId",["username" ,"email"]);
        // const myConnectionRequests = await ConnectionRequest.find({toUserId:req.user._id,status:"interested"}).populate("fromUserId","username email"); //this also works.
        // const myIds = myConnectionRequests.map(request => request.fromUserId._id);
        // const myConnections = await User.find({_id:{$in:myIds}}).select(["username","email"]);
        if(myConnectionRequests.length === 0) return res.status(200).json({success: true ,message:"No connection requests found"});
        res.status(200).json({success:true, requestsCount: myConnectionRequests.length,myConnectionRequests});
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        
    }
}