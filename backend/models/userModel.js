import mongoose from "mongoose";
const us=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type : String,required:true},
    role:{type:String,enum:["member","admin"],default:"member"},
    projects:[],
    tasks:[],
    history:[],
})
Module.export=us;