import {
  FETCH_REPRESENTATIVE_FAILED,
  FETCH_REPRESENTATIVE_INITIATED,
  FETCH_REPRESENTATIVE_SUCCESS
} from '../../actions/ActionTypes/representative'

export const getRepresentativeById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_REPRESENTATIVE_INITIATED:
      return {
        ...state,
        isFetching: true
      }

    case FETCH_REPRESENTATIVE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        representativeProfile: action.payload?.representative,
        error: null
      }

    case FETCH_REPRESENTATIVE_FAILED:
      return {
        ...state,
        isFetching: false,
        representativeProfile: false,
        error: action.payload
      }
    default:
      return state
  }
}
