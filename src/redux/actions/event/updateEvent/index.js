import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_EVENT_FAILED,
  FETCH_EVENT_INITIATED,
  FETCH_EVENT_SUCCESS,
  RESET_UPDATE_EVENT_STATE,
  UPDATE_EVENT_FAILED,
  UPDATE_EVENT_INITIATED,
  UPDATE_EVENT_SUCCESS
} from '../../ActionTypes/event'

export const fetchEventInitiated = () => ({ type: FETCH_EVENT_INITIATED })
export const fetchEventSuccess = data => ({ type: FETCH_EVENT_SUCCESS, payload: data })
export const fetchEventFailed = data => ({ type: FETCH_EVENT_FAILED, payload: data })
export const updateEventInitiated = () => ({ type: UPDATE_EVENT_INITIATED })
export const updateEventSuccess = data => ({ type: UPDATE_EVENT_SUCCESS, payload: data })
export const updateEventFailed = data => ({ type: UPDATE_EVENT_FAILED, payload: data })
export const resetUpdateEventState = () => ({ type: RESET_UPDATE_EVENT_STATE })


export const handleFetchEvent = id => {
  return async dispatch => {
    try {
      dispatch(fetchEventInitiated())
      const response = await useJwt.getEvent(id)
      if (response?.data) {
        dispatch(fetchEventSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchEventFailed(err.response?.data))
      }
    }
  }
}

export const handleUpdateEvent = (id, data) => {
  return async dispatch => {
    try {
      dispatch(updateEventInitiated())
      const response = await useJwt.updateEvent(id, data)
      if (response.data) {
        dispatch(updateEventSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateEventFailed(err.response.data))
      }
    }
  }
}
