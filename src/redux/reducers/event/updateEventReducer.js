import {
  FETCH_EVENT_FAILED,
  FETCH_EVENT_INITIATED,
  FETCH_EVENT_SUCCESS,
  RESET_UPDATE_EVENT_STATE,
  UPDATE_EVENT_FAILED,
  UPDATE_EVENT_INITIATED,
  UPDATE_EVENT_SUCCESS
} from '../../actions/ActionTypes/event'

export const updateEventReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EVENT_INITIATED:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        eventProfile: action.payload,
        error: null
      }

    case FETCH_EVENT_FAILED:
      return {
        ...state,
        isLoading: false,
        eventProfile: false,
        error: action.payload
      }

    case UPDATE_EVENT_INITIATED:
      return {
        ...state,
        updateEventInProcess: true
      }

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        updateEventInProcess: false,
        updateEventProfile: action.payload,
        error: null
      }

    case UPDATE_EVENT_FAILED:
      return {
        ...state,
        updateEventInProcess: false,
        updateEventProfile: false,
        error: action.payload
      }

    case RESET_UPDATE_EVENT_STATE:
      return {
        ...state,
        updateEventProfile: false,
        eventProfile: false,
        error: null
      }

    default:
      return state
  }
}
