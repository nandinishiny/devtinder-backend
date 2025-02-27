import app from "./app.js";
import dotenv from 'dotenv';
import connectToDB  from "./config/database.js";
dotenv.config();
connectToDB().then(() => {
    console.log("Connected to DB");
    app.listen(3000,()=>{
        console.log("app is listening at 3000")
    })
}).catch((error) => {
    console.log(error);
});
