const express=require('express');
const Router=express.Router();
const {create,creating,login}=require('../controllers/mid.js');
const {isLoggedin}=require('../middleware/isLoggedin.js');
Router.get('/',isLoggedin,(req,res)=>{
    res.redirect('/');
})
Router.get('/login',(req,res)=>{
    res.render('index');
});
Router.post('/login',login);
Router.get('/create',create);
Router.post('/create',creating);
module.exports=Router;