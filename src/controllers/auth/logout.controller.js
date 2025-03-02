


export const logoutUser = async(req,res)=>{
    try {
        //you can write it like this too.
        // res.cookie("token",null,{expires: new Date(Date.now())}); 
        //we are attaching cookie to the response object.
        res.status(200).clearCookie('token').json({success:true,message:"logout successfull"});
        
        
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,message:error.message});
        
    }
}
//we don't care whether the user is logged in or not. we are just clearing the cookie. so no need to check the user is logged in or not.