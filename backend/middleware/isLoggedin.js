const jwt=require('jsonwebtoken');
const usermodel=require('../models/userModel');
const isLoggedin= async (req,res,next)=>{
    var tok=req.cookies.token;
    if(token){
        let dec=jwt.verify(token,process.env.jwt_key);
        let user=await usermodel.findOne({email:dec.email});
        if(user){
            next();
        }else{
            res.redirect('users/login');
        }
        
    }else{
        return res.redirect('users/login');
    }

}
module.exports=isLoggedin;