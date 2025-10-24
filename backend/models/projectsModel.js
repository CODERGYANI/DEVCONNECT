import mongoose from "mongoose";
const pm=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type : String,required:true},
    ownership:{type:String,enum:["public","private"],default:"private"},
    member:[],
    host:[],
    task:[],
    createdBy:{type:String},
})
Module.export=pm;