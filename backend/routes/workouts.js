const express = require('express')
const{createWorkout,getAllWorkouts,getSingleWorkout,deleteSingleWorkout,updateSingleWorkout}= require('../controllers/workoutControllers')
const router= express.Router()

const middleware= require('../middleware/requireAuth')

router.use(middleware)

router.get('/',getAllWorkouts)

router.get('/:id',getSingleWorkout)

router.post('/', createWorkout)

router.delete('/:id',deleteSingleWorkout)

router.patch('/:id',updateSingleWorkout)

module.exports= router