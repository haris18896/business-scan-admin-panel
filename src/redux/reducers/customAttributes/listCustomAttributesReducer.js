/* eslint-disable implicit-arrow-linebreak */
import {
  DELETE_CUSTOM_ATTRIBUTE_FAILURE,
  DELETE_CUSTOM_ATTRIBUTE_INITIATED,
  DELETE_CUSTOM_ATTRIBUTE_SUCCESS,
  LIST_CUSTOM_ATTRIBUTES_FAILURE,
  LIST_CUSTOM_ATTRIBUTES_INITIATED,
  LIST_CUSTOM_ATTRIBUTES_SUCCESS,
  PAGE_CHANGE,
  PAGE_RESET,
  RESET_LIST_CUSTOM_ATTRIBUTES,
  SELECT_CHANGE
} from '../../actions/ActionTypes/customAttributes'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}

export const listCustomAttributesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_CUSTOM_ATTRIBUTES_INITIATED:
      return {
        ...state,
        attributesListInProcess: true
      }

    case LIST_CUSTOM_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        attributesListInProcess: false,
        attributesListData: action.payload,
        totalRecords: action.payload.customAttributesCount,
        totalPages: action.payload.totalPages,
        error: null
      }

    case LIST_CUSTOM_ATTRIBUTES_FAILURE:
      return {
        ...state,
        attributesListInProcess: false,
        attributesListData: {},
        totalRecords: false,
        totalPages: false,
        error: action.payload
      }

    case SELECT_CHANGE: {
      return { ...state, limit: action.payload, page: 1 }
    }
    case PAGE_CHANGE: {
      return { ...state, attributesListInProcess: true, page: action.payload }
    }

    case DELETE_CUSTOM_ATTRIBUTE_INITIATED: {
      return { ...state, deleteInProcess: true, isDeleted: false }
    }
    case DELETE_CUSTOM_ATTRIBUTE_SUCCESS: {
      return { ...state, deleteInProcess: false, isDeleted: true }
    }

    case DELETE_CUSTOM_ATTRIBUTE_FAILURE:
      return {
        ...state,
        deleteInProcess: false,
        isDeleted: false
      }

    case PAGE_RESET: {
      return { ...state, page: 1 }
    }

    case RESET_LIST_CUSTOM_ATTRIBUTES:
      return initialState

    default:
      return state
  }
}
