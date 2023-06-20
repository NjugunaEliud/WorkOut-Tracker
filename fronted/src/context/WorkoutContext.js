import React, { createContext, useReducer } from 'react';

export const WorkoutContext = createContext();

export const workOutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUT':
      return {
        workouts: action.payload,
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts],
      };
      case 'DELETE':
      return {
        workouts: state.workouts.filter((w)=>w.id !== action.payload._id)
      };
    default:
      return state;
  }
};

const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workOutReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export default WorkoutContextProvider;
