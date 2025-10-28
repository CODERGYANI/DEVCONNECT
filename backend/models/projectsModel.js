const mongoose=require('mongoose');
const projectModel=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    ownership:{type:String,enum:["public","private"],default:"private"},
    member:[],
    host:[],
    task:[],
    request:[],
    createdBy:{type:String},
})
module.export=projectModel;