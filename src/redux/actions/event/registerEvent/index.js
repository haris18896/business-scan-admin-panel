import useJwt from '@src/auth/jwt/useJwt'
import {
  REGISTER_EVENT_FAILURE,
  REGISTER_EVENT_INITIATED,
  REGISTER_EVENT_SUCCESS,
  RESET_EVENT_STATE
} from '../../ActionTypes/event'

export const resetState = () => ({ type: RESET_EVENT_STATE })
export const registerEventInitiated = () => ({ type: REGISTER_EVENT_INITIATED })
export const registerEventSuccess = data => ({ type: REGISTER_EVENT_SUCCESS, payload: data })
export const registerEventFailure = data => ({ type: REGISTER_EVENT_FAILURE, payload: data })

export const handleRegisterEvent = data => {
  return async dispatch => {
    try {
      dispatch(registerEventInitiated())
      const response = await useJwt.registerEvent(data)
      if (response.data) {
        dispatch(registerEventSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        dispatch(registerEventFailure(err.response.data))
      }
    }
  }
}
