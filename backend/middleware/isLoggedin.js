const jwt=require('jsonwebtoken');
const usermodel=require('../models/userModel');
const isLoggedin= async (req,res,next)=>{
    var toke=req.cookies.token;
    if(toke){
        let dec=jwt.verify(toke,process.env.jwt_key);
        let user=await usermodel.findOne({email:dec.email});
        if(user){
            next();
        }else{
            res.redirect('/user/login');
        }
        
    }else{
        return res.redirect('/user/login');
    }

}
module.exports={isLoggedin};