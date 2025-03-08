import mongoose from "mongoose";
const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type: String,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message: "{VALUE} is not accepted"
        },
        required: true
    }
},{timestamps: true});
connectionRequestSchema.index({fromUserId:1,toUserId:1}); //creating compound index. this will help in searching the requests faster.
connectionRequestSchema.pre("save",async function(next){
    //check if the fromUserId and toUserId are same.
    if(this.fromUserId.toString() === this.toUserId.toString()){
        throw new Error("You cannot send connection request to yourself");
    }
    next();
});
export const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);