import {SET_TOKEN,CLEAR_TOKEN} from './types'

export const SetToken=(token)=>{
    return (
        {
            type:SET_TOKEN,
            payload:token
        }
    )
}

export const ClearToken=()=>{
    return (
        {
            type:CLEAR_TOKEN,
        }
    )
}