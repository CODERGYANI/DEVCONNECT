require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();
const db = require('./config/db');
db();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const USER = require('./routes/userRoutes');
const Project = require('./routes/projectRoutes');
const task = require('./routes/TasksRoutes');

app.use('/user', USER);
app.use('/task', task);
app.use('/projects', Project);

app.listen(3000, () => console.log('Server running on port 3000'));

