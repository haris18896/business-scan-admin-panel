import useJwt from '@src/auth/jwt/useJwt'
import {
  GET_CUSTOM_ATTRIBUTE_BY_ID_FAILURE,
  GET_CUSTOM_ATTRIBUTE_BY_ID_INITIATED,
  GET_CUSTOM_ATTRIBUTE_BY_ID_SUCCESS,
  RESET_UPDATE_CUSTOM_ATTRIBUTE,
  UPDATE_CUSTOM_ATTRIBUTE_FAILURE,
  UPDATE_CUSTOM_ATTRIBUTE_INITIATED,
  UPDATE_CUSTOM_ATTRIBUTE_SUCCESS
} from '../ActionTypes/customAttributes'

export const fetchCustomAttributesInitiated = () => ({ type: GET_CUSTOM_ATTRIBUTE_BY_ID_INITIATED })
export const fetchCustomAttributesSuccess = data => ({ type: GET_CUSTOM_ATTRIBUTE_BY_ID_SUCCESS, payload: data })
export const fetchCustomAttributesFailed = data => ({ type: GET_CUSTOM_ATTRIBUTE_BY_ID_FAILURE, payload: data })
export const updateCustomAttributeInitiated = () => ({ type: UPDATE_CUSTOM_ATTRIBUTE_INITIATED })
export const updateCustomAttributeSuccess = data => ({ type: UPDATE_CUSTOM_ATTRIBUTE_SUCCESS, payload: data })
export const updateCustomAttributeFailed = data => ({ type: UPDATE_CUSTOM_ATTRIBUTE_FAILURE, payload: data })
export const resetUpdateCustomAttributeState = () => ({ type: RESET_UPDATE_CUSTOM_ATTRIBUTE })

export const handleFetchCustomAttributes = id => {
  return async dispatch => {
    try {
      dispatch(fetchCustomAttributesInitiated())
      const response = await useJwt.getCustomAttributes(id)
      if (response?.data) {
        dispatch(fetchCustomAttributesSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchCustomAttributesFailed(err.response?.data))
      }
    }
  }
}

export const handleUpdateCustomAttributes = (id, data) => {
  return async dispatch => {
    try {
      dispatch(updateCustomAttributeInitiated())
      const response = await useJwt.updateCustomAttributes(id, data)
      if (response.data) {
        dispatch(updateCustomAttributeSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(updateCustomAttributeFailed(err.response.data))
      }
    }
  }
}
