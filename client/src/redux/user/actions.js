import {SET_USER,CLEAR_USER} from './types'

export const SetUser=(user)=>{
    return (
        {
            type:SET_USER,
            payload:user
        }
    )
}

export const ClearUser=()=>{
    return (
        {
            type:CLEAR_USER,
        }
    )
}