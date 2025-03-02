import mongoose from "mongoose";
import validator from "validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 20
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }

    },
    password:{
        type: String,
        required: true,
        minLength:8
    },
    gender: {
        type: String,
        enum:["male","female","others"],
    },
    age:{
        type: Number,
        validate(value){
            if(value<18){
                throw new Error("Age must be greater than 18")
            }
        }
    },
    skills:{
        type: [String],
        //custom validation, minLength didn't work on array.
        validate(value){
            if(value.length === 0 || value.length > 5){
                throw new Error("please enter atleast one and atmost 5 skills")
            }
        }
    },
    photoUrl: {
        type: String,
        validate: {
            validator: function(value){
                return validator.isURL(value);
            },
            message: "please enter valid url"
           
    }
}},{timestamps: true});
userSchema.methods.getJWT = async function(){
    /*const user =this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: "8h"});*/
    //you can write above or directly write like below.
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: "8h"});
    // const token = jwt.sign({_id: this._id}, "my_secret", {expiresIn: "8h"});

    return token;
};
userSchema.methods.validatePassword = async function(password){
    const isPasswordValid = await bcrypt.compare(password, this.password);
    return isPasswordValid;
}
export const User = mongoose.model("User", userSchema);