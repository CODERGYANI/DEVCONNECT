import express from 'express';
const Router=express.Router();
const {create,creating,login}=require('../middleware/mid.js');
const {isLoggedin}=require('../middleware/isLoggedin.js');
Router.get('/',isLoggedin,(req,res)=>{
    res.redirect('/');
})
Router.get('/login',isLoggedin,(req,res)=>{
    res.redirect('/');
});
Router.post('/login',login);
Router.get('/create',create);
Router.post('/create',creating);