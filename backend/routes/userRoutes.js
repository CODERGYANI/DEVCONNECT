const express=require('express');
const Router=express.Router();
const {create,creating,login}=require('../controllers/mid.js');
const {isLoggedin}=require('../middleware/isLoggedin.js');
Router.get('/',isLoggedin,(req,res)=>{
    
    res.render('index');
})
Router.get('/login',(req,res)=>{
    res.render('login');
});
Router.get('/:username/notification',(req,res)=>{

})
Router.post('/login',login);
Router.get('/create',create);
Router.post('/create',creating);
module.exports=Router;