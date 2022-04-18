import {
  UPDATE_REPRESENTATIVE_INITIATED,
  UPDATE_REPRESENTATIVE_SUCCESS,
  UPDATE_REPRESENTATIVE_FAILED,
  RESET_UPDATE_REPRESENTATIVE_STATE
} from '../../actions/ActionTypes/representative'

export const updateRepresentativeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_REPRESENTATIVE_INITIATED:
      return {
        ...state,
        updateRepresentativeInProcess: true
      }

    case UPDATE_REPRESENTATIVE_SUCCESS:
      return {
        ...state,
        updateRepresentativeInProcess: false,
        updateRepresentativeProfile: action.payload,
        error: null
      }

    case UPDATE_REPRESENTATIVE_FAILED:
      return {
        ...state,
        updateRepresentativeInProcess: false,
        updateRepresentativeProfile: false,
        error: action.payload
      }

    case RESET_UPDATE_REPRESENTATIVE_STATE:
      return {
        ...state,
        updateRepresentativeProfile: false,
        error: null
      }

    default:
      return state
  }
}
