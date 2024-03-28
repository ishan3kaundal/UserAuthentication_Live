import session from "express-session";

import userModel from "../model/userModel.js";

import bcrypt from "bcrypt";
import { request } from "express";

class Controller {
    static login_get = (req, res) => {
       // req.session.isValid = true;
        //  console.log(req.session);
        //console.log(req.session.id);
        const myMsg = req.session.msg;
        console.log(req.session);
       
        delete req.session.msg
        console.log("=============")
        console.log(session)
        res.render("login.ejs", {myMsg});
    };

    static dashboard_get = (req, res) => {
        const myMsg = req.session.msg
        delete req.session.msg
        res.render("dashboard.ejs",{myMsg});
    };

    static logout_post = (req, res) => {
        req.session.destroy((err)=>{
            if(err){
                throw err
            }
            else{
                res.redirect('/home')
            }
        })
    }

    static home_get = (req, res) => {
        res.render("home.ejs");
    };

    static signup_get = (req, res) => {
        const myMsg =req.session.msg;
        delete req.session.msg;
        res.render("signup.ejs",{myMsg});
    };  

    static signup_post = async (req, res) => {
        try {
            const form_data = req.body;
            let user = await userModel.findOne({ email: form_data.email });

            if(user){
                req.session.msg = `${user.name} is an existing user. Please Login.`
                res.redirect('/login')
            }
            const hashedPwd = await bcrypt.hash(form_data.pwd, 10);

            if (!user) {
                user = new userModel({
                    name: form_data.name,
                    email: form_data.email,
                    pwd: hashedPwd,
                });
                const user_saved =  user.save();
                console.log(user_saved);
                req.session.msg = `Dear ${user.name} Welcome. Please Login.`

                res.redirect('/login')
            }
        } catch(err) {}
    };

    static login_post = async (req, res) => {
        try {
            const form_data = req.body;
            let existing_user = await userModel.findOne({
                email: form_data.email,
            });
            console.log("existing_user", existing_user);
            if (!existing_user) {
                
                req.session.msg=`Not an existing user. Please SignUp.`
                return res.redirect("/signup");
            }
            const user_matched = await bcrypt.compare(
                form_data.pwd,
                existing_user.pwd
            );
            console.log("user_matched", user_matched);
            if (user_matched) {
                req.session.isValid=true
                req.session.msg=`Welcome Dear ${existing_user.name} `
                
                res.redirect("/dashboard");
                console.log("dashboard");
            } else {
                res.redirect("/login");
            }
            res.send(user_matched);
        } catch(err) {
            
        }
    };
}

export default Controller;
