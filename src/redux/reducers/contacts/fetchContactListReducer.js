import {
  DELETE_CONTACT_FAILED,
  DELETE_CONTACT_INITIATED,
  DELETE_CONTACT_SUCCESS,
  FETCH_CONTACTS_LIST_FAILED,
  FETCH_CONTACTS_LIST_INITIATED,
  FETCH_CONTACTS_LIST_SUCCESS,
  PAGE_CHANGE,
  RESET_CONTACTS_LIST,
  SELECT_CHANGE
} from '../../actions/ActionTypes/contacts'

const initialState = {
  page: 1,
  limit: 10,
  totalRecords: 0
}
export const contactListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS_LIST_INITIATED:
      return {
        ...state,
        inProcess: true
      }

    case FETCH_CONTACTS_LIST_SUCCESS:
      return {
        ...state,
        inProcess: false,
        contactListData: action.payload,
        totalRecords: action.payload.contactsCount,
        totalPages: action.payload.totalPages,
        error: null
      }

    case FETCH_CONTACTS_LIST_FAILED:
      return {
        ...state,
        inProcess: false,
        contactListData: false,
        totalRecords: false,
        totalPages: false,
        error: action.payload
      }

    case SELECT_CHANGE: {
      return { ...state, limit: action.payload, page: 1 }
    }
    case PAGE_CHANGE: {
      return { ...state, inProcess: true, page: action.payload }
    }

    case DELETE_CONTACT_INITIATED: {
      return { ...state, deleteInProcess: true, isDeleted: false }
    }
    case DELETE_CONTACT_SUCCESS: {
      return { ...state, deleteInProcess: false, isDeleted: true }
    }

    case DELETE_CONTACT_FAILED:
      return {
        ...state,
        deleteInProcess: false,
        isDeleted: false
      }

    case RESET_CONTACTS_LIST:
      return initialState

    default:
      return state
  }
}
