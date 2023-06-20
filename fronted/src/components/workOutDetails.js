import {useWorkoutContext} from '../hooks/useWorkoutContext'
import{useAuthContext} from '../hooks/useAuthContext'
const WorkOutDetails = ({workout}) => {
    const{dispatch} =useWorkoutContext()
    const{user}=useAuthContext()
    const handleClick =async ()=>{
        
        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers:{'Authorization':`Bearer ${user.token}`}
        });
        const json = await response.json();
        if (response.ok) {
            console.log('The delete is working');
            dispatch({ type: 'DELETE', payload: json });
        } else {
            console.log('The delete is not working');
            // Handle the error scenario here
        }
        
    }
    return (  
        <div className="workout-details">
              <h4>{workout.title}</h4>
              <p><strong>Load (kg):</strong>{workout.load}</p>
              <p>{workout.createdAt}</p>
              <span onClick={handleClick}>delete</span>
              


        </div>
    );
}
 
export default WorkOutDetails;