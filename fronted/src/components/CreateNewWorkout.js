import{useState}from'react';
import {useWorkoutContext} from '../hooks/useWorkoutContext'
import{useAuthContext} from '../hooks/useAuthContext'
const CreateNewWorkOut = () => {
    const[title, setTitle]= useState('');
    const[repets, setRepets]= useState('');
    const[load, setLoad]= useState('');
    const[error, setErr]= useState(null);
    const{dispatch} =useWorkoutContext()
    const{user}=useAuthContext()
    const handleSubmit= async(e)=>{
        e.preventDefault()
        if(!user){
            setErr("You must be logged in")
            return
        }
        const WorkOut = {title, repets, load}
        const response= await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(WorkOut),
            headers:{'Content-type':'application/json',
                   'Authorization':`Bearer ${user.token}`
        
        }

        })
        const json= await response.json()
        if (!response.ok){
            setErr(json.error)

        }
        if(response.ok){
            setErr(null)
            setLoad('')
            setRepets('')
            setTitle('')
            console.log('new workOut added')
            dispatch({type:'CREATE_WORKOUT', payload:json})
        }


    }
    return ( 
        <form  className="create" onSubmit={handleSubmit}>
            <h3>Add a new WorkOut</h3>
            <label>Excersice Title:</label>
            <input type="text" value={title} onChange = {(e) => setTitle(e.target.value)} />
            <label>Load (in Kg):</label>
            <input type="number" value={load} onChange = {(e) => setLoad(e.target.value)} />
            <label>Repeats:</label>
            <input type="number" value={repets} onChange = {(e) => setRepets(e.target.value)} />
           <button>Add WorkOut</button>
           {error && <div className='error'>{error}</div>}
        </form>

     );
}
 
export default CreateNewWorkOut;