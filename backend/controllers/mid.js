const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const userModel=require("../models/userModel");
const create=(req,res)=>{
    return res.render('createuser');
};
const creating= async (req,res) => {
    var {name,email,password}=req.body;
    const user=await userModel.findOne({email});
    if(user){
        return res.redirect('/user/login');
    }else{
        try{
            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(password,salt,async function(err,hash){
                    let m=await userModel.create({
                        name,
                        email,
                        password:hash,
                    });
                    return res.redirect('/user/login');
                });   
            });
        }catch(error){
            return res.send(error.message);
        }
    }
};
const login= async (req,res)=>{
    var {email,password}=req.body;
    let user= await userModel.findOne({email});
    if(!user){
        return res.redirect("/user/create");
    }else{
        let m=await bcrypt.compare(password,user.password);
        if(m){
            var token=jwt.sign({email},process.env.jwt_key)
            res.cookie("token",token);
            return res.redirect('/user/');
        }else{
            return res.send("something went wrong");
        }
    }

};
module.exports={create,creating,login};
