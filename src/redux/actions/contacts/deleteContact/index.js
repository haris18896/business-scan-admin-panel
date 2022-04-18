import useJwt from '@src/auth/jwt/useJwt'
import { DELETE_CONTACT_FAILED, DELETE_CONTACT_INITIATED, DELETE_CONTACT_SUCCESS } from '../../ActionTypes/contacts'
import { handleFetchContactList } from '../fetchContactList'

export const deleteContactInitiated = () => ({ type: DELETE_CONTACT_INITIATED })
export const deleteContactSuccess = () => ({ type: DELETE_CONTACT_SUCCESS })
export const deleteContactFailed = data => ({ type: DELETE_CONTACT_FAILED, payload: data })

export const handleDeleteContact = (eventId, page, limit, searchKeyword) => {
  return async dispatch => {
    try {
      dispatch(deleteContactInitiated())
      const response = await useJwt.deleteContact(eventId)
      if (response && response.data) {
        dispatch(deleteContactSuccess())
        dispatch(handleFetchContactList(page, limit, searchKeyword))
      }
    } catch (err) {
      if (err.response?.data) {
        dispatch(deleteContactFailed(err.response.data))
      }
    }
  }
}
