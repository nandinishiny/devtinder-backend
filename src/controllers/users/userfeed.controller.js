import { ConnectionRequest } from "../../models/connectionRequest.model.js";
import { User } from "../../models/user.model.js"

export const userFeedController = async(req,res)=>{
    try {
        const loggedInUser = req.user;
        //intially it came as string, so we using parseInt to convert it into integer.
        const page = parseInt(req.query.page)||1;
        let limit = parseInt(req.query.limit)||5;
        limit = limit>20?20:limit; //we are just allowing 20 users once.
        /*if(limit>50){
            throw new Error("limit has exceed");
        }*/
        /*const users = await User.find({}).select(["-password","-createdAt","-updatedAt"]);
        const usersData = users.filter(user => user._id.toString() !== req.user._id.toString());*/
        const connectionRequests = await ConnectionRequest.find({$or:[{toUserId:req.user._id},{fromUserId:req.user._id}]}).select(["fromUserId","toUserId"]).populate("fromUserId","username email").populate("toUserId","username email");
        //the users who we should avoid.
        let hideUsersFromFeed = new Set;
        connectionRequests.forEach(request=>{
            if(request.fromUserId._id.toString() === loggedInUser._id.toString()){
                hideUsersFromFeed.add(request.toUserId._id); //you can to string here and you can ignore it.
            }else{
                hideUsersFromFeed.add(request.fromUserId._id);
            }
        });
        //it is a set, not an array.so methods like map,filter won't work.
        //now we are sending a network call to user-collection.
        const users = await User.find({
            $and :[{_id:{$ne:loggedInUser._id}},{_id: {$nin: Array.from(hideUsersFromFeed)}}]
        }).select(" username email gender age skills photoUrl ").skip((page-1)*limit).limit(limit);
        res.status(200).json({success:true, userCount: users.length, data:users});
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        
    }
}