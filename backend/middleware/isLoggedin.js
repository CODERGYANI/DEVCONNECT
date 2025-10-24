const jwt=require('jsonwebtoken');
const usermodel=require('../models/userModel');
const isLoggedin= async (req,res,next)=>{
    var tok=req.cookies.token;
    if(!token){
        return res.redirect("/");
    }else{
        try{
            let dec=jwt.verify(token,process.env.jwt_key);
            let user=await usermodel.findOne({email:dec.email});
            next();
        }catch(error){
            console.log("seomthing went wrong");
            return res.redirect("/");
        }

    }

}