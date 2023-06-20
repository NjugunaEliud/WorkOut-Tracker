import {useAuthContext} from './useAuthContext'
import {useWorkoutContext} from './useWorkoutContext'

export const useLogout = ()=>{
    const{dispatch} = useAuthContext()
    const{dispatch:workout}=useWorkoutContext()

     const logout=()=>{
        localStorage.removeItem('user')


        dispatch({type:'LOGOUT'})

        workout({type:'SET_WORKOUT',payload:null})


     }
     return {logout}

    }
