import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
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
export const User = mongoose.model("User", userSchema);