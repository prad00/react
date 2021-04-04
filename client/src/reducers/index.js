import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form';

import { SIGNED_IN } from '../actions/type';
import streamRreducer from './streamReducer'

const googleSignedIn = (state=null,action) => {
    switch(action.type){
        case SIGNED_IN:
            return action.payload
        default:
            return state
    }
}


export default combineReducers({
    googleSignedIn,
    form: formReducer,
    streams:streamRreducer
});