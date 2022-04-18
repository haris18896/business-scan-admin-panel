import {
  ADD_CUSTOM_ATTRIBUTE_FAILURE,
  ADD_CUSTOM_ATTRIBUTE_INITIATED,
  ADD_CUSTOM_ATTRIBUTE_SUCCESS,
  RESET_ADD_CUSTOM_ATTRIBUTE
} from '../../actions/ActionTypes/customAttributes'

export const addCustomAttributeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CUSTOM_ATTRIBUTE_INITIATED:
      return { ...state, attributesInProcess: true }
    case ADD_CUSTOM_ATTRIBUTE_SUCCESS:
      return { ...state, attributesInProcess: false, attributesData: action.payload, error: null }
    case ADD_CUSTOM_ATTRIBUTE_FAILURE:
      return { ...state, attributesInProcess: false, error: action.payload, attributesData: null }
    case RESET_ADD_CUSTOM_ATTRIBUTE:
      return {}
    default:
      return state
  }
}
