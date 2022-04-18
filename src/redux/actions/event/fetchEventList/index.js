import useJwt from '@src/auth/jwt/useJwt'
import {
  PAGE_CHANGE,
  SELECT_CHANGE,
  FETCH_EVENTS_LIST_FAILED,
  FETCH_EVENTS_LIST_INITIATED,
  FETCH_EVENTS_LIST_SUCCESS,
  RESET_EVENTS_LIST
} from '../../ActionTypes/event'

export const pageChange = data => ({ type: PAGE_CHANGE, payload: data })
export const selectChange = data => ({ type: SELECT_CHANGE, payload: data })

export const resetEventListState = () => ({ type: RESET_EVENTS_LIST })
export const fetchEventListInitiated = () => ({ type: FETCH_EVENTS_LIST_INITIATED })
export const fetchEventListSuccess = data => ({ type: FETCH_EVENTS_LIST_SUCCESS, payload: data })
export const fetchEventListFailed = data => ({ type: FETCH_EVENTS_LIST_FAILED, payload: data })

export const handleFetchEventList = (page, limit, startDateFromFilter, startDateToFilter, searchKeyword = null) => {
  return async dispatch => {
    try {
      dispatch(fetchEventListInitiated())
      const response = await useJwt.getEventList(page, limit, startDateFromFilter, startDateToFilter, searchKeyword)
      if (response.data) {
        dispatch(fetchEventListSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchEventListFailed(err.response.data))
      }
    }
  }
}

export const handlePageChange = (page, limit, startDateFromFilter, startDateToFilter, searchKeyword = null) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch(pageChange(newPage))
    dispatch(handleFetchEventList(newPage, limit, startDateFromFilter, startDateToFilter, searchKeyword))
  }
}

export const handleSelectChange = (newLimit, oldLimit, startDateFromFilter, startDateToFilter, searchKeyword) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(selectChange(newLimit))
      dispatch(pageChange(1))
      dispatch(handleFetchEventList(1, newLimit, startDateFromFilter, startDateToFilter, searchKeyword))
    }
  }
}
