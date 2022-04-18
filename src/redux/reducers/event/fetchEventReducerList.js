import {
  DELETE_EVENT_FAILED,
  DELETE_EVENT_INITIATED,
  DELETE_EVENT_SUCCESS,
  FETCH_EVENTS_LIST_FAILED,
  FETCH_EVENTS_LIST_INITIATED,
  FETCH_EVENTS_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_EVENTS_LIST,
  SELECT_CHANGE
} from '../../actions/ActionTypes/event'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}

export const eventListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS_LIST_INITIATED:
      return {
        ...state,
        eventsInProcess: true
      }

    case FETCH_EVENTS_LIST_SUCCESS:
      return {
        ...state,
        eventsInProcess: false,
        eventListData: action.payload,
        totalRecords: action.payload.eventsCount,
        totalPages: action.payload.totalPages,
        error: null
      }

    case FETCH_EVENTS_LIST_FAILED:
      return {
        ...state,
        eventsInProcess: false,
        eventListData: false,
        totalRecords: false,
        totalPages: false,
        error: action.payload
      }

    case SELECT_CHANGE: {
      return { ...state, limit: action.payload, page: 1 }
    }
    case PAGE_CHANGE: {
      return { ...state, eventsInProcess: true, page: action.payload }
    }

    case DELETE_EVENT_INITIATED: {
      return { ...state, deleteInProcess: true, isDeleted: false }
    }
    case DELETE_EVENT_SUCCESS: {
      return { ...state, deleteInProcess: false, isDeleted: true }
    }

    case DELETE_EVENT_FAILED:
      return {
        ...state,
        deleteInProcess: false,
        isDeleted: false
      }

    case RESET_EVENTS_LIST:
      return initialState

    default:
      return state
  }
}
