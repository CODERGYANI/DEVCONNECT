import express from "express"
const app=express();
const USER=require('./routes/userRoutes');
const Project=require('./routes/projectRoutes');
const task=require('./routes/TasksRoutes');
app.use("/user",USER);
app.use("/task",Task);
app.use("/projects",Project);
