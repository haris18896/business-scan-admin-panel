import useJwt from '@src/auth/jwt/useJwt'
import {
  REGISTER_REPRESENTATIVE_FAILURE,
  REGISTER_REPRESENTATIVE_INITIATED,
  REGISTER_REPRESENTATIVE_SUCCESS,
  RESET_REPRESENTATIVE_STATE
} from '../../ActionTypes/representative'

export const registerRepresentativeInitiated = () => ({ type: REGISTER_REPRESENTATIVE_INITIATED })
export const registerRepresentativeSuccess = data => ({ type: REGISTER_REPRESENTATIVE_SUCCESS, payload: data })
export const registerRepresentativeFailure = data => ({ type: REGISTER_REPRESENTATIVE_FAILURE, payload: data })
export const resetState = () => ({ type: RESET_REPRESENTATIVE_STATE })

export const handleRegisterRepresentative = data => {
  return async dispatch => {
    try {
      dispatch(registerRepresentativeInitiated())
      const response = await useJwt.registerRepresentative(data)
      if (response.data) {
        dispatch(registerRepresentativeSuccess(response.data))
      }
    } catch (err) {
      if (err.response?.data) {
        dispatch(registerRepresentativeFailure(err.response.data))
      }
    }
  }
}
