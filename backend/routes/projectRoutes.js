const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const {isLoggedin} = require('../middleware/isLoggedin');
const userModel = require('../models/userModel');
const projectModel = require('../models/projectModel');

Router.get('/create', (req, res) => {
    
    res.render('create');
});
Router.post('/create', async (req, res) => {
    try {
        var token = req.cookies.token;
        const dec = jwt.verify(token, process.env.jwt_key);
        const email = dec.email;
        var { name, ownership } = req.body;

        const user = await userModel.findOne({ email });
        const project = await projectModel.create({
            name,
            email,
            ownership,
            host: [user.name],
            createdBy: user.name,
        });

        var pro = user.project || [];
        pro.push(project._id);
        user.project = pro;

        await user.save();
        res.send("Project created successfully");
    } catch (err) {
        console.log(err);
        res.send("Error creating project");
    }
});

Router.get('/:username/:projectid', async (req, res) => {
    try {
        var use = req.params.username;
        var pro = req.params.projectid;
        var token = req.cookies.token;
        const dec = jwt.verify(token, process.env.jwt_key);
        const em = dec.email;

        const user = await userModel.findOne({ name: use });
        const project = await projectModel.findOne({ name: pro });

        if (!user || !project) {
            return res.send("Wrong URL");
        }

        if (user.email === em) {
            return res.render('project', { project, pro, use, access: "true" });
        } else {
            const member = project.member || [];
            var no = true;
            for (var i = 0; i < member.length; i++) {
                if (member[i] === em) {
                    no = false;
                    break;
                }
            }

            if (!no) {
                res.render('project', { project, pro, use, access: "true" });
            } else {
                res.render('project', { project: null, pro, use, access: "denied" });
            }
        }
    } catch (err) {
        console.log(err);
        res.send("Error loading project");
    }
});

Router.get('/:projectid/:username', isLoggedin, async (req, res) => {
    try {
        var pid = req.params.projectid;
        var uss = req.params.username;

        var project = await projectModel.findOne({ _id: pid });
        var host = project.host[0];
        var user = await userModel.findOne({ name: host });
        var user2 = await userModel.findOne({ name: uss });

        var request = project.request || [];
        var reqq = user.req || [];

        request.push(user2._id);
        project.request = request;
        reqq.push(project._id);
        user.req = reqq;

        await project.save();
        await user.save();

        res.send("Access request sent");
    } catch (err) {
        console.log(err);
        res.send("Error sending access request");
    }
});

Router.get('/:username/:projectid/granted', async (req, res) => {
    try {
        var pid = req.params.projectid;
        var username = req.params.username;

        var pro = await projectModel.findOne({ _id: pid });
        var k = pro.member || [];
        var user = await userModel.findOne({ name: username });

        k.push(user._id);
        pro.member = k;

        await user.save();
        await pro.save();

        res.send("Access granted");
    } catch (err) {
        console.log(err);
        res.send("Error granting access");
    }
});

module.exports = Router;
