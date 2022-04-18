import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_CONTACT_FAILED,
  FETCH_CONTACT_INITIATED,
  FETCH_CONTACT_SUCCESS,
  RESET_UPDATE_CONTACT_STATE,
  UPDATE_CONTACT_FAILED,
  UPDATE_CONTACT_INITIATED,
  UPDATE_CONTACT_SUCCESS
} from '../../ActionTypes/contacts'

export const fetchContactInitiated = () => ({ type: FETCH_CONTACT_INITIATED })
export const fetchContactSuccess = data => ({ type: FETCH_CONTACT_SUCCESS, payload: data })
export const fetchContactFailed = data => ({ type: FETCH_CONTACT_FAILED, payload: data })
export const updateContactInitiated = () => ({ type: UPDATE_CONTACT_INITIATED })
export const updateContactSuccess = data => ({ type: UPDATE_CONTACT_SUCCESS, payload: data })
export const updateContactFailed = data => ({ type: UPDATE_CONTACT_FAILED, payload: data })
export const resetUpdateContactState = () => ({ type: RESET_UPDATE_CONTACT_STATE })

export const handleFetchContact = id => {
  return async dispatch => {
    try {
      dispatch(fetchContactInitiated())
      const response = await useJwt.getContact(id)
      if (response?.data) {
        dispatch(fetchContactSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchContactFailed(err.response?.data))
      }
    }
  }
}

export const handleUpdateContact = (id, data) => {
  return async dispatch => {
    try {
      dispatch(updateContactInitiated())
      const response = await useJwt.updateContact(id, data)
      if (response.data) {
        dispatch(updateContactSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateContactFailed(err.response.data))
      }
    }
  }
}
