const mongoose=require('mongoose');
const projectSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    ownership:{type:String,enum:["public","private"],default:"private"},
    member:[],
    host:[],
    task:[],
    request:[],
    discription:[],
    createdBy:{type:String},
});
const projectModel = mongoose.model('Project', projectSchema);
module.exports=projectModel;