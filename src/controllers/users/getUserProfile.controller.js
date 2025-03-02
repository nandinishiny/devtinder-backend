export const getProfileController = async(req,res)=>{
    try {
        const user = req.user; //we are getting the user from the middleware.
        res.status(200).json({success: true, user});
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
        
    }
}