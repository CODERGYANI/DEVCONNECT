const express=require('express');
const Router=express.Router();
const cp=require('cookie-parser');
const isLoggedin = require('../middleware/isLoggedin');
Router.get('/create',(req,res)=>{
    res.redirect('create');
})
Router.post('/create',async (req,res)=>{
    var token=req.cookies.token;
    const dec=jwt.verify(token,process.env.jwt_key);
    const email=dec.email;
    var {name,ownership}=req.body;

    const user= await userModel.FindOne({email});
    const project=await projectModel.Create({
        name,
        email,
        ownership,
        host:[user.name],
        createdBy:user.name,
    });
    var pro=user.project;
    pro.push(project.id);
    user.project=pro;
})
Router.get('/:username/:projectid',async (req,res)=>{
    var use=req.params.username;
    var pro=req.params.projectid;
    var token=req.cookies.token;
    const dec=jwt.verify(token,process.env.jwt_key);
    const em=dec.email;
    const user=await userModel.FindOne({name:use});
    const project=await projectModel.findOne({name:pro});
    if(!user || !project){
        res.send("wrong url");
    }
    else if(user.email!=em){
        res.render('/project',{project,pro,use,access:"true"});
    }else{
        const member=project.member;
        var no=true;
        for(var i=0;i<member.length;i++){
            if(member[i]==em){
                no=false;
                break;
            }
        }
        if(!no){
            res.render('/project',{project,pro,use,access:"true"});
        }else{
            res.render('/project',{project:null,pro,use,access:"denied"});
        }

    }
    

})
Router.get('/:projectid/:username', isLoggedin, async (req, res) => {
    try {
        var pid = req.params.projectid;
        var uss = req.params.username;

        var project = await projectModel.findOne({ _id: pid });
        var host = project.host[0];
        var user = await userModel.findOne({ name: host });
        var user2 = await userModel.findOne({ name: uss });

        var request = project.request;
        var reqq = user.req;

        request.push(user2.id);
        project.request = request;
        reqq.push(project.id);
        user.req = reqq;

        await project.save();
        await user.save();

        res.send("Access request sent");
    } catch (err) {
        console.log(err);
        res.send("error");
    }
});




module.exports=Router;
