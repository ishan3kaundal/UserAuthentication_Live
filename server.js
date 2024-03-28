console.log("*****Welcome *****!!!")

import express from 'express'

import mongoose from 'mongoose'

import session from 'express-session'

import MongoStore from 'connect-mongo'

import isValidUser from './middlewares/validate.js'

import router from './routes/routes.js'

import {} from 'dotenv/config';

const uri = process.env.MONGO_URI

// const uri = "mongodb+srv://ishan3kaundal:FhjtZYB7VqasGpon@cluster0.hpjkbbz.mongodb.net/CostcoUsers?retryWrites=true&w=majority&appName=Cluster0";

const session_store = MongoStore.create({
    mongoUrl: uri,
    dbName : 'CostcoUsers',
    collectionName : 'CostcoSessions',
})


const app = express()

app.use(express.urlencoded({extended:true}))

app.use(session({
    secret : 'A secret key to sign the cookie',
    saveUninitialized : false,
    resave : false,
    store : session_store
}))

app.set('view-engine','ejs')

app.use(express.static('public'))

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{

    console.log(`App is listening at port ${PORT}`)
})

// app.get('/home',(req,res)=>{

//     res.render('home.ejs')

// })


// app.get('/login',(req,res)=>{

//    req.session.isValid = true

//     console.log(req.session)

//     console.log(req.session.id)

//     res.render('login.ejs')
// })

// Adding Middleware to Dashboard Route
// To restrict the user from accessing the dashboard page
// Only login user having session will be visiting the dashboard page 

// app.get('/dashboard',isValidUser,(req,res)=>{

//     res.render('dashboard.ejs')
// })

// app.post('/logout',(req,res)=>{

//     req.session.destroy((err)=>{
//         if(err) throw err

//         res.redirect('/home')

//     })
// })


app.use('/',router);


