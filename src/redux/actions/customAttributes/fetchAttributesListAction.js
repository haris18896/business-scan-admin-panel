import useJwt from '@src/auth/jwt/useJwt'
import {
  LIST_CUSTOM_ATTRIBUTES_FAILURE,
  LIST_CUSTOM_ATTRIBUTES_INITIATED,
  LIST_CUSTOM_ATTRIBUTES_SUCCESS,
  PAGE_CHANGE,
  RESET_LIST_CUSTOM_ATTRIBUTES,
  SELECT_CHANGE
} from '../ActionTypes/customAttributes'

export const pageChange = data => ({ type: PAGE_CHANGE, payload: data })
export const selectChange = data => ({ type: SELECT_CHANGE, payload: data })

export const resetCustomAttributesListState = () => ({ type: RESET_LIST_CUSTOM_ATTRIBUTES })
export const fetchCustomAttributesListInitiated = () => ({ type: LIST_CUSTOM_ATTRIBUTES_INITIATED })
export const fetchCustomAttributesListSuccess = data => ({ type: LIST_CUSTOM_ATTRIBUTES_SUCCESS, payload: data })
export const fetchCustomAttributesListFailed = error => ({ type: LIST_CUSTOM_ATTRIBUTES_FAILURE, payload: error })

export const handleFetchCustomAttributesList = (page, limit, parent, category, searchKeyword = null) => {
  return async dispatch => {
    try {
      dispatch(fetchCustomAttributesListInitiated())
      const response = await useJwt.getCustomAttributeList(page, limit, parent, category, searchKeyword)
      if (response.data) {
        dispatch(fetchCustomAttributesListSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchCustomAttributesListFailed(err.response.data))
      }
    }
  }
}

export const handlePageChangeCustomAttributes = (page, limit, parent, category, searchKeyword = null) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch(pageChange(newPage))
    dispatch(handleFetchCustomAttributesList(newPage, limit, parent, category, searchKeyword))
  }
}

export const handleSelectChangeCustomAttributes = (newLimit, oldLimit, parent, category, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(selectChange(newLimit))
      dispatch(pageChange(1))
      dispatch(handleFetchCustomAttributesList(1, newLimit, parent, category, searchKeyword))
    }
  }
}
