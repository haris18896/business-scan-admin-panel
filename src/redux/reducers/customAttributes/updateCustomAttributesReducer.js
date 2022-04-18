import {
  GET_CUSTOM_ATTRIBUTE_BY_ID_FAILURE,
  GET_CUSTOM_ATTRIBUTE_BY_ID_INITIATED,
  GET_CUSTOM_ATTRIBUTE_BY_ID_SUCCESS,
  RESET_UPDATE_CUSTOM_ATTRIBUTE,
  UPDATE_CUSTOM_ATTRIBUTE_FAILURE,
  UPDATE_CUSTOM_ATTRIBUTE_INITIATED,
  UPDATE_CUSTOM_ATTRIBUTE_SUCCESS
} from '../../actions/ActionTypes/customAttributes'

export const updateCustomAttributesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CUSTOM_ATTRIBUTE_BY_ID_INITIATED:
      return {
        ...state,
        isLoading: true
      }

    case GET_CUSTOM_ATTRIBUTE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        attributeDataById: action.payload,
        getError: null
      }

    case GET_CUSTOM_ATTRIBUTE_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        attributeDataById: false,
        getError: action.payload
      }

    case UPDATE_CUSTOM_ATTRIBUTE_INITIATED:
      return {
        ...state,
        updateAttributesInProcess: true
      }

    case UPDATE_CUSTOM_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        updateAttributesInProcess: false,
        updateAttributesData: action.payload,
        error: null
      }

    case UPDATE_CUSTOM_ATTRIBUTE_FAILURE:
      return {
        ...state,
        updateAttributesInProcess: false,
        updateAttributesData: false,
        error: action.payload
      }

    case RESET_UPDATE_CUSTOM_ATTRIBUTE:
      return {
        ...state,
        attributeDataById: false,
        updateAttributesData: false,
        getError: null,
        error: null
      }

    default:
      return state
  }
}
