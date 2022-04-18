import {
  FETCH_CONTACT_FAILED,
  FETCH_CONTACT_INITIATED,
  FETCH_CONTACT_SUCCESS,
  RESET_UPDATE_CONTACT_STATE,
  UPDATE_CONTACT_FAILED,
  UPDATE_CONTACT_INITIATED,
  UPDATE_CONTACT_SUCCESS
} from '../../actions/ActionTypes/contacts'

export const updateContactReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTACT_INITIATED:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fetchContactSuccess: action.payload.success,
        contactProfile: action.payload,
        error: null
      }

    case FETCH_CONTACT_FAILED:
      return {
        ...state,
        isLoading: false,
        fetchContactSuccess: false,
        contactProfile: false,
        error: action.payload
      }

    case UPDATE_CONTACT_INITIATED:
      return {
        ...state,
        updateContactInProcess: true
      }

    case UPDATE_CONTACT_SUCCESS:
      return {
        ...state,
        updateContactInProcess: false,
        updateContactProfile: action.payload,
        error: null
      }

    case UPDATE_CONTACT_FAILED:
      return {
        ...state,
        updateContactInProcess: false,
        updateContactProfile: false,
        error: action.payload
      }

    case RESET_UPDATE_CONTACT_STATE:
      return {
        ...state,
        updateContactProfile: false,
        contactProfile: false,
        error: null
      }

    default:
      return state
  }
}
