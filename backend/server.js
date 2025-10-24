const express=require('express');
const app=express();
const USER=require('./routes/userRoutes');
const Project=require('./routes/projectRoutes');
const task=require('./routes/TasksRoutes');
app.use("/users",USER);
app.use("/task",task);
app.use("/projects",Project);
const path=require('path');
const cookieParser=require('cookie-parser');
app.use(cookieParser);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine',"ejs");
app.use(express.static(path.join(__dirname,'public')));
require('dotenv').config();
const mongoose=require("./config/db");
app.listen(3000);

