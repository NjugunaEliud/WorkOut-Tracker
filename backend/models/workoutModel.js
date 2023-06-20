const mongoose= require('mongoose')
const Schema = mongoose.Schema
const workOutSchema = new Schema({
    
        title:{
            type:String,
            Required:true
        },

        repets:{
            type:Number,
            Required:true
        },
        load:{
            type:Number,
            Required:true
        },
        user_id:{
            type:String,
            Required:true
        }
    
},{timestamps:true})

module.exports=mongoose.model('Workout',workOutSchema)