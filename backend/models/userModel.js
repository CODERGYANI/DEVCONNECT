import mongoose from "mongoose";
const us=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type : String,required:true},
    owner:{type:String,enum:["public","private"],default:"public"},
    role:{type:String,enum:["member","admin","host"],default:"member"},
    projects:[],
    tasks:[],
})
Module.export=us;