import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_REPRESENTATIVE_FAILED,
  FETCH_REPRESENTATIVE_INITIATED,
  FETCH_REPRESENTATIVE_SUCCESS,
  RESET_UPDATE_REPRESENTATIVE_STATE,
  UPDATE_REPRESENTATIVE_FAILED,
  UPDATE_REPRESENTATIVE_INITIATED,
  UPDATE_REPRESENTATIVE_SUCCESS
} from '../../ActionTypes/representative'

export const fetchRepresentativeInitiated = () => ({ type: FETCH_REPRESENTATIVE_INITIATED })
export const fetchRepresentativeSuccess = data => ({ type: FETCH_REPRESENTATIVE_SUCCESS, payload: data })
export const fetchRepresentativeFailed = data => ({ type: FETCH_REPRESENTATIVE_FAILED, payload: data })
export const updateRepresentativeInitiated = () => ({ type: UPDATE_REPRESENTATIVE_INITIATED })
export const updateRepresentativeSuccess = data => ({ type: UPDATE_REPRESENTATIVE_SUCCESS, payload: data })
export const updateRepresentativeFailed = data => ({ type: UPDATE_REPRESENTATIVE_FAILED, payload: data })
export const resetUpdateRepresentativeState = () => ({ type: RESET_UPDATE_REPRESENTATIVE_STATE })

export const handleFetchRepresentative = _id => {
  return async dispatch => {
    try {
      dispatch(fetchRepresentativeInitiated())
      const response = await useJwt.getRepresentative(_id)
      if (response?.data) {
        dispatch(fetchRepresentativeSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchRepresentativeFailed(err.response?.data))
      }
    }
  }
}

export const handleUpdateRepresentative = (_id, data) => {
  return async dispatch => {
    try {
      dispatch(updateRepresentativeInitiated())
      const response = await useJwt.updateRepresentative(_id, data)
      if (response.data) {
        dispatch(updateRepresentativeSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateRepresentativeFailed(err.response.data))
      }
    }
  }
}
