import useJwt from '@src/auth/jwt/useJwt'
import {
  FETCH_CONTACTS_LIST_FAILED,
  FETCH_CONTACTS_LIST_INITIATED,
  FETCH_CONTACTS_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_CONTACTS_LIST,
  SELECT_CHANGE
} from '../../ActionTypes/contacts'

export const pageChange = data => ({ type: PAGE_CHANGE, payload: data })
export const selectChange = data => ({ type: SELECT_CHANGE, payload: data })

export const resetContactListState = () => ({ type: RESET_CONTACTS_LIST })
export const fetchContactListInitiated = () => ({ type: FETCH_CONTACTS_LIST_INITIATED })
export const fetchContactListSuccess = data => ({ type: FETCH_CONTACTS_LIST_SUCCESS, payload: data })
export const fetchContactListFailed = data => ({ type: FETCH_CONTACTS_LIST_FAILED, payload: data })

export const handleFetchContactList = (
  page,
  limit,
  eventIdFilter,
  representativeFilter,
  type,
  createdDateFromFilter,
  createdDateToFilter,
  searchKeyword = null
) => {
  return async dispatch => {
    try {
      dispatch(fetchContactListInitiated())
      const response = await useJwt.getContactList(
        page,
        limit,
        eventIdFilter,
        representativeFilter,
        type,
        createdDateFromFilter,
        createdDateToFilter,
        searchKeyword
      )
      if (response.data) {
        dispatch(fetchContactListSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(fetchContactListFailed(err.response.data))
      }
    }
  }
}

export const handlePageChange = (
  page,
  limit,
  eventIdFilter,
  representativeFilter,
  type,
  createdDateFromFilter,
  createdDateToFilter,
  searchKeyword = null
) => {
  return async dispatch => {
    const newPage = page.selected + 1
    dispatch(pageChange(newPage))
    dispatch(
      handleFetchContactList(
        newPage,
        limit,
        eventIdFilter,
        representativeFilter,
        type,
        createdDateFromFilter,
        createdDateToFilter,
        searchKeyword
      )
    )
  }
}

export const handleSelectChange = (
  newLimit,
  oldLimit,
  eventIdFilter,
  representativeFilter,
  type,
  createdDateFromFilter,
  createdDateToFilter,
  searchKeyword
) => {
  return async dispatch => {
    if (newLimit !== oldLimit) {
      dispatch(selectChange(newLimit))
      dispatch(pageChange(1))
      dispatch(
        handleFetchContactList(
          1,
          newLimit,
          eventIdFilter,
          representativeFilter,
          type,
          createdDateFromFilter,
          createdDateToFilter,
          searchKeyword
        )
      )
    }
  }
}
