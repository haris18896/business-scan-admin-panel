import useJwt from '@src/auth/jwt/useJwt'
import { DELETE_EVENT_FAILED, DELETE_EVENT_INITIATED, DELETE_EVENT_SUCCESS } from '../../ActionTypes/event'
import { handleFetchEventList } from '../fetchEventList'

export const deleteEventInitiated = () => ({ type: DELETE_EVENT_INITIATED })
export const deleteEventSuccess = () => ({ type: DELETE_EVENT_SUCCESS })
export const deleteEventFailed = data => ({ type: DELETE_EVENT_FAILED, payload: data })

export const handleDeleteEvent = (eventId, page, limit, searchKeyword) => {
  return async dispatch => {
    try {
      dispatch(deleteEventInitiated())
      const response = await useJwt.deleteEvent(eventId)
      if (response && response.data) {
        dispatch(deleteEventSuccess())
        dispatch(handleFetchEventList(page, limit, searchKeyword))
      }
    } catch (err) {
      if (err.response?.data) {
        dispatch(deleteEventFailed(err.response.data))
      }
    }
  }
}
