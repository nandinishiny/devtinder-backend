import { isDataAllowed } from "../../utils/isDataAllowed.js";

export const editProfile = async (req,res)=>{
    //we can include so many checks here, i am just not checking here.
    try {
        const user = req.user;
        const isUserDataAllowed = isDataAllowed(req.body);
        if(!isUserDataAllowed) throw new Error("invalid information");
        /*const {username,email,password,gender,age,skills,photoUrl} = req.body;
        user.username = username || user.username;
        user.password = password? await bcrypt.hash(password, 10): user.password;
        user.age = age || user.age;
        user.gender = gender || user.gender;
        user.skills = skills || user.skills;
        user.photoUrl = photoUrl || user.photoUrl;*/
        Object.keys(req.body).forEach(key => {
            user[key] = req.body[key];
        })
        await user.save();
        res.status(200).json({success:true,message:`dear ${user?.username} your profile updated successfully`,user});
        
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
        
    }
}