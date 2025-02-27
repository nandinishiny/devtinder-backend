import {User} from '../models/user.model.js';
const registerController = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        const user = await User.create({username,email,password}); //we are creating a new instance of user model.
        res.status(200).send(user);
        
    } catch (error) {
        console.log("The error is "+error)
        res.status(400).send("please fill the details correctly")
        
    }

}
export {registerController};