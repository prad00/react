import streams from "../api";
import history from '../history'

import {
    SIGNED_IN,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
  } from './type';
export const onSignedIn = (signedInStatus,userId=null) => {
    return (
        {
            type:SIGNED_IN,
            payload:{signedInStatus,userId}
        }
    );
}


export const createStreams = (formValues) => async (dispatch,getState) => {
    const {userId:currentUserId} = getState().googleSignedIn
    const response = await streams.post('/streams',{...formValues,currentUserId})

    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push('/')
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams')

    dispatch({ type: FETCH_STREAMS, payload: response.data });
    
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)

    dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const editStream = (id,formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`,formValues)

    dispatch({ type: EDIT_STREAM, payload: response.data });
    history.push('/')
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`)

    dispatch({ type: DELETE_STREAM, payload: id });
}