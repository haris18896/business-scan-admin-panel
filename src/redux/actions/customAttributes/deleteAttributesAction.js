import useJwt from '@src/auth/jwt/useJwt'
import {
  DELETE_CUSTOM_ATTRIBUTE_FAILURE,
  DELETE_CUSTOM_ATTRIBUTE_INITIATED,
  DELETE_CUSTOM_ATTRIBUTE_SUCCESS
} from '../ActionTypes/customAttributes'

export const deleteAttributesInitiated = () => ({ type: DELETE_CUSTOM_ATTRIBUTE_INITIATED })
export const deleteAttributesSuccess = data => ({ type: DELETE_CUSTOM_ATTRIBUTE_SUCCESS, payload: data })
export const deleteAttributesFailure = error => ({ type: DELETE_CUSTOM_ATTRIBUTE_FAILURE, payload: error })

export const handleDeleteAttributes = id => {
  return async dispatch => {
    try {
      dispatch(deleteAttributesInitiated())
      const response = await useJwt.deleteCustomAttributes(id)
      if (response.data) {
        dispatch(deleteAttributesSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(deleteAttributesFailure(err.response.data))
      }
    }
  }
}
