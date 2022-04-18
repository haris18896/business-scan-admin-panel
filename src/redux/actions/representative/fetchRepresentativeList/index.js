import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_REPRESENTATIVES_LIST_FAILED,
  FETCH_REPRESENTATIVES_LIST_INITIATED,
  FETCH_REPRESENTATIVES_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_REPRESENTATIVES_LIST,
  SELECT_CHANGE
} from '../../ActionTypes/representative'

export const pageChange = data => ({ type: PAGE_CHANGE, payload: data })
export const selectChange = data => ({ type: SELECT_CHANGE, payload: data })

export const resetRepresentativeListState = () => ({ type: RESET_REPRESENTATIVES_LIST })
export const fetchRepresentativeListInitiated = () => ({ type: FETCH_REPRESENTATIVES_LIST_INITIATED })
export const fetchRepresentativeListSuccess = data => ({ type: FETCH_REPRESENTATIVES_LIST_SUCCESS, payload: data })
export const fetchRepresentativeListFailed = data => ({ type: FETCH_REPRESENTATIVES_LIST_FAILED, payload: data })

export const handleFetchRepresentativeList = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    try {
      dispatch(fetchRepresentativeListInitiated())
      const response = await useJwt.getRepresentativeList(page, limit, searchKeyword)
      if (response.data) {
        dispatch(fetchRepresentativeListSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchRepresentativeListFailed(err.response.data))
      }
    }
  }
}

export const handlePageChange = (page, limit, searchKeyword = null) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch(pageChange(newPage))
    dispatch(handleFetchRepresentativeList(newPage, limit, searchKeyword))
  }
}

export const handleSelectChange = (newLimit, oldLimit, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(selectChange(newLimit))
      dispatch(pageChange(1))
      dispatch(handleFetchRepresentativeList(1, newLimit, searchKeyword))
    }
  }
}
