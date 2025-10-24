import mongoose from "mongoose";
const pm=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type : String,required:true},
    member:[],
    host:[],
    task:[],
    createdBy:{type:String},
})
Module.export=pm;