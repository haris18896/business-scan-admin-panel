import useJwt from '@src/auth/jwt/useJwt'
import {
  EXPORT_CSV_CONTACTS_FAILED,
  EXPORT_CSV_CONTACTS_INITIATED,
  EXPORT_CSV_CONTACTS_SUCCESS,
  RESET_EXPORT
} from '../../ActionTypes/contacts'

export const resetExportCsv = () => ({ type: RESET_EXPORT })
export const exportCSVInitiated = () => ({ type: EXPORT_CSV_CONTACTS_INITIATED })
export const exportCSVSuccess = data => ({ type: EXPORT_CSV_CONTACTS_SUCCESS, payload: data })
export const exportCSVFailEd = data => ({ type: EXPORT_CSV_CONTACTS_FAILED, payload: data })

export const handleExportCSV = (
  page,
  limit,
  eventIdFilter,
  representativeFilter,
  type,
  createdDateFromFilter,
  createdDateToFilter,
  searchKeyword
) => {
  return async dispatch => {
    try {
      dispatch(exportCSVInitiated())
      const response = await useJwt.exportCsvContactList(
        page,
        limit,
        eventIdFilter,
        representativeFilter,
        type,
        createdDateFromFilter,
        createdDateToFilter,
        searchKeyword
      )
      if (response.data) {
        dispatch(exportCSVSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(exportCSVFailEd(err.response.data))
      }
    }
  }
}
