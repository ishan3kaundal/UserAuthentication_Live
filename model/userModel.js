import mongoose from "mongoose";
import {} from 'dotenv/config';

// const uri = "mongodb+srv://ishan3kaundal:FhjtZYB7VqasGpon@cluster0.hpjkbbz.mongodb.net/CostcoUsers?retryWrites=true&w=majority&appName=Cluster0";

const uri = process.env.MONGO_URI

mongoose.connect(uri).then(()=>console.log("*********************Connected Successfully***************"))
.catch((err)=>console.log(`###############Not connected due to error##############`))



const userSchema = mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String,required:true},
    pwd : {type:String,required:true}

})

const userModel = mongoose.model("generalusers", userSchema);
export default userModel;