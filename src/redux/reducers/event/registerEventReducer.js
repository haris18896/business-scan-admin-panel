import {
  REGISTER_EVENT_FAILURE,
  REGISTER_EVENT_INITIATED,
  REGISTER_EVENT_SUCCESS,
  RESET_EVENT_STATE
} from '../../actions/ActionTypes/event'

export const registerEventReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_EVENT_INITIATED:
      return {
        ...state,
        isLoading: true
      }

    case REGISTER_EVENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        registerEvent: action.payload,
        questions: action.payload.questions,
        error: null
      }

    case REGISTER_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        registerEvent: null,
        error: action.payload,
        questions: false
      }

    case RESET_EVENT_STATE:
      return {}

    default:
      return state
  }
}
