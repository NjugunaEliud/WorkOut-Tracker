const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator = require('validator')

const Schema= mongoose.Schema

const userAuthSchema = new Schema({
    email:{
        type:String,
        Required:true,
        unique:true
        
    },
    password:{
        type:String,
        Required:true
    }
})

userAuthSchema.statics.signup=async function(email,password){
    if(!email || !password){
        throw Error("This Fields are required")
    }
    if(!validator.isEmail(email)){
        throw Error("This is not a valid email")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }
    const exist= await this.findOne({email})

    if(exist){
        throw Error("Email Already in use")
    }

    const salt= await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password,salt)

    const user =await this.create({email,password:hash})

   return user
    
}
userAuthSchema.statics.login=async function(email,password) {
    if(!email || !password){
        throw Error("This Fields are required")
    }
    const user= await this.findOne({email})

    if(!user){
        throw Error("Invalid Email Address")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Invalid password')
    }
    return user


}
module.exports=mongoose.model('Use',userAuthSchema)