const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const usermodel=require("../models/userModel");
const create=(req,res)=>{
    var token=req.cookies.token;
    if(!token){
        return res.redirect('/');
    }else{
        return res.redirect('/');
    }
};
const creating= async (req,res) => {
    var {name,email,password}=req.body;
    const user=await usermodel.findOne({email});
    if(user){
        return res.redirect('user/login');
    }else{
        try{
            bcrypt.genSalt(10,function(err,salt)){
                bcrypt.hash(password,salt,async function(err,hash){
                    let m=await usermodel.create({
                        name,
                        email,
                        password:hash,
                    });
                    
                    let token=jwt.sign({email:user.email},process.env.jwt_key);
                    res.cookie("token",token);
                    return res.redirect('users/login');
                });
                
            };
        }catch(error){
            return res.send(error.message);
        }
    }
};
const login= async (req,res)=>{
    var {email,password}=req.body;
    let user= await usermodel.findOne({email});
    if(!user){
        return res.send("users/create");
    }else{
        let m=await bcrypt.compare(password,hash.password);
        if(m){
            var token=jwt.sign({email},process.env.jwt_key)
            res.cookie("token",token);
            return res.redirect('/content');
        }else{
            return res.send("something went wrong");
        }
    }

};
module.exports={create,creating,login};
