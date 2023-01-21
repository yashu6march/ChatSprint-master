import {combineReducers} from 'redux'
import {UserReducer} from './user/reducer'
import {TokenReducer} from './token/reducer'


export const RootReducer =combineReducers({
    user:UserReducer,
    token:TokenReducer
})