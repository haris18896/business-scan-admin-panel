import {
  FETCH_REPRESENTATIVES_LIST_FAILED,
  FETCH_REPRESENTATIVES_LIST_INITIATED,
  FETCH_REPRESENTATIVES_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_REPRESENTATIVES_LIST,
  SELECT_CHANGE
} from '../../actions/ActionTypes/representative'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}
export const representativeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPRESENTATIVES_LIST_INITIATED:
      return {
        ...state,
        inProcess: true
      }

    case FETCH_REPRESENTATIVES_LIST_SUCCESS:
      return {
        ...state,
        inProcess: false,
        representativeListData: action.payload,
        totalRecords: action.payload.representativesCount,
        totalPages: action.payload.totalPages,
        error: null
      }

    case FETCH_REPRESENTATIVES_LIST_FAILED:
      return {
        ...state,
        inProcess: false,
        representativeListData: false,
        totalRecords: false,
        totalPages: false,
        error: action.payload
      }

    case SELECT_CHANGE: {
      return { ...state, limit: action.payload, page: 1 }
    }
    case PAGE_CHANGE: {
      return { ...state, inProcess: true, page: action.payload }
    }

    case RESET_REPRESENTATIVES_LIST:
      return initialState

    default:
      return state
  }
}
