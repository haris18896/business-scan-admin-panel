import {
  EXPORT_CSV_CONTACTS_FAILED,
  EXPORT_CSV_CONTACTS_INITIATED,
  EXPORT_CSV_CONTACTS_SUCCESS,
  RESET_EXPORT
} from '../../actions/ActionTypes/contacts'

const initialState = {
  page: 1,
  limit: 10
}
export const exportContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_CSV_CONTACTS_INITIATED:
      return {
        ...state,
        exportInProcess: true
      }

    case EXPORT_CSV_CONTACTS_SUCCESS:
      return {
        ...state,
        exportInProcess: false,
        exportData: action.payload,
        error: null
      }

    case EXPORT_CSV_CONTACTS_FAILED:
      return {
        ...state,
        exportInProcess: false,
        exportData: false,
        error: action.payload
      }

    case RESET_EXPORT:
      return {
        ...state,
        exportInProcess: false,
        exportData: null,
        error: null
      }

    default:
      return state
  }
}
