import { CLEAR_USER, SET_USER } from "./types";
const initialState=null;

export const UserReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_USER:
            return action.payload

        case CLEAR_USER:
            return null

        default:
            return state
    }
}