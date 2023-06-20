require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const WorkOut = require('./routes/workouts')
const Auth = require('./routes/Authroutes')

const app = express()

app.use(express.json())


//midleware
app.use((req , res, next)=>{
    console.log(req.path, req.method)
    next()
})

app.use("/api/user",Auth)

app.use("/api/workouts",WorkOut)





mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("connected to db and  listnening at port 4000")
        
    })

})
.catch(err=>{
    console.log(err)
})

