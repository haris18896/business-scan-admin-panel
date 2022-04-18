import {
  REGISTER_REPRESENTATIVE_INITIATED,
  REGISTER_REPRESENTATIVE_SUCCESS,
  REGISTER_REPRESENTATIVE_FAILURE,
  RESET_REPRESENTATIVE_STATE
} from '../../actions/ActionTypes/representative'

export const registerRepresentativeReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REPRESENTATIVE_INITIATED:
      return {
        ...state,
        isLoading: true
      }

    case REGISTER_REPRESENTATIVE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        registerRepresentative: action.payload,
        error: null
      }

    case REGISTER_REPRESENTATIVE_FAILURE:
      return {
        ...state,
        isLoading: false,
        registerRepresentative: null,
        error: action.payload
      }

    case RESET_REPRESENTATIVE_STATE:
      return {}

    default:
      return state
  }
}
