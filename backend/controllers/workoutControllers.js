const Workout = require('../models/workoutModel')
const mongoose= require('mongoose')

//get all work outs
const getAllWorkouts = async(req, res)=>{

    const user_id =req.user._id
    const workout= await Workout.find({user_id}).sort({createdAt:-1})

    res.status(200).json(workout)
}

//get single work outs

const getSingleWorkout = async(req,res) => {
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'workout not found'})

    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({err:"No such Workout"})
    }
    res.status(200).json(workout)
}

//create a new work outs
const createWorkout=async (req, res)=>{
    const user_id =req.user._id
    const {title, repets,load}= req.body

    try{
        const  workout= await Workout.create({title,repets,load,user_id})
        res.status(200).json(workout)

    }catch (error){
        res.status(400).json({error:error.message})

    }
}
 
//delete work outs
const deleteSingleWorkout = async(req,res) => {
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'workout not found id is not Valid'})

    }
    const workout = await Workout.findOneAndDelete({_id:id})
    if(!workout){
        return res.status(404).json({error:"No such Workout"})
    }
    res.status(200).json(workout)
}


//update work outs
const updateSingleWorkout = async(req,res) => {
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'workout not found id is not Valid'})

    }
    const workout = await Workout.updateOne({_id:id},{...req.body})
    if(!workout){
        return res.status(404).json({err:"No such Workout"})
    }
    res.status(200).json(workout)
}

module.exports={
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteSingleWorkout,
    updateSingleWorkout
}