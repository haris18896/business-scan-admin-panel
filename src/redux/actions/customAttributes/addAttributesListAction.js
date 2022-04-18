import useJwt from '@src/auth/jwt/useJwt'
import {
  ADD_CUSTOM_ATTRIBUTE_FAILURE,
  ADD_CUSTOM_ATTRIBUTE_INITIATED,
  ADD_CUSTOM_ATTRIBUTE_SUCCESS,
  RESET_ADD_CUSTOM_ATTRIBUTE
} from '../ActionTypes/customAttributes'

export const resetAddCustomAttributes = () => ({ type: RESET_ADD_CUSTOM_ATTRIBUTE })
export const addCustomAttributesInitiated = () => ({ type: ADD_CUSTOM_ATTRIBUTE_INITIATED })
export const addCustomAttributesSuccess = data => ({ type: ADD_CUSTOM_ATTRIBUTE_SUCCESS, payload: data })
export const addCustomAttributesFailed = error => ({ type: ADD_CUSTOM_ATTRIBUTE_FAILURE, payload: error })

export const handleAddCustomAttributes = data => {
  return async dispatch => {
    try {
      dispatch(addCustomAttributesInitiated())
      const response = await useJwt.addCustomAttributes(data)
      if (response.data) {
        dispatch(addCustomAttributesSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(addCustomAttributesFailed(err.response.data))
      }
    }
  }
}
