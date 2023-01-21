import { CLEAR_TOKEN, SET_TOKEN } from "./types";
const initialState=null;

export const TokenReducer=(state=initialState,action)=>{
    switch(action.type){
        case SET_TOKEN:
            return action.payload

        case CLEAR_TOKEN:
            return null

        default:
            return state
    }
}