import {  useEffect } from "react";
import WorkOutDetails from '../components/workOutDetails';
import CreateNewWorkOut from "../components/CreateNewWorkout"; 
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import{useAuthContext} from '../hooks/useAuthContext'

const Home = () => {
   const{workouts ,dispatch} =useWorkoutContext(); 
   const{user}=useAuthContext()
    useEffect(()=>{
        const fetchWorkOuts = async()=>{
            const response= await fetch('/api/workouts/',{
                headers:{'Authorization':`Bearer ${user.token}`}
            })
            const json= await response.json()
            if(response.ok){
                dispatch({type:'SET_WORKOUT',payload:json})

            }
        }
        if(user){
            fetchWorkOuts()

        }


        
    },[dispatch, user])
    return (  
        <div className="home">
          <div className="workouts">
             {workouts  &&  workouts.map((workout)=>(
              
                <WorkOutDetails key={workout._id}  workout={workout} />

             ))}
          </div>
          <CreateNewWorkOut></CreateNewWorkOut>
        </div>
    );
}

 
export default Home;