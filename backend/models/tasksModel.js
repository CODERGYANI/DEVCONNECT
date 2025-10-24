import mongoose from "mongoose";
const tm=await mongoose.Schema({
    priority:{type:String,enum:["low","medium","high"],default:"medium"},
    title:{type:String,required:true},
    projectid:{type:mongoose.Schema.Types.ObjectId,required:true},
    createdby:{type:mongoose.Schema.Types.ObjectId},
    assignedto:[{type:mongoose.Schema.Types.ObjectId}],

});
Module.export=tm;
