import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";
const connectToDB = async()=>{
    try {
        const connectionString = `mongodb+srv://nandinishiny136:${process.env.MONGO_DB_PASSWORD}@devtinder-cluster.yiwh9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=devTinder-cluster`;
        console.log(DB_NAME)
        const connectionInstance = await mongoose.connect(connectionString);
        // console.log(connectionInstance.connection.readyState);
        
    } catch (error) {
        console.log("The error is "+error)    
    }
}
export default connectToDB;