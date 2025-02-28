import validator from 'validator'
const validateSignupData = (data) => {
    const { username,email, password} = data;
    if(!username) throw new Error("username is required");
    if(!email){
        throw new Error("email is required");
    }
    if(!validator.isEmail(email)){
        throw new Error("email is invalid");
    }
    if(!password){
        throw new Error("password is required");
    }
    if(password.length < 8) throw new Error("password must be atleast 8 characters long");
    if(!validator.isStrongPassword(password)) throw new Error("password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character");
    


};
export default validateSignupData;