const mongoose=require('mongoose');
const userModel=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type : String,required:true},
    role:{type:String,enum:["member","admin"],default:"member"},
    projects:[],
    reqq:[],
    tasks:[],
    history:[],
})
module.export=userModel;