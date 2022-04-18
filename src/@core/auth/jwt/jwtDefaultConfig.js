// ** Auth Endpoints
import { MAIN_SERVICE_URL } from '../../../constants/const'

export default {
  loginEndpoint: `${MAIN_SERVICE_URL}/admin/loginAdmin`,
  fetchProfileEndPoint: `${MAIN_SERVICE_URL}/admin/getAdminProfile`,
  updateAdminProfile: `${MAIN_SERVICE_URL}/admin/updateAdminProfile`,
  updatePasswordEndPoint: `${MAIN_SERVICE_URL}/admin/updateAdminPassword`,
  registerRepresentativeEndpoint: `${MAIN_SERVICE_URL}/representative/registerRepresentative`,
  getRepresentativeEndPoint: `${MAIN_SERVICE_URL}/representative/getRepresentative/`,
  updateRepresentativeEndPoint: `${MAIN_SERVICE_URL}/representative/updateRepresentative/`,
  getRepresentativeListEndPoint: `${MAIN_SERVICE_URL}/representative/listRepresentatives`,
  registerEventEndpoint: `${MAIN_SERVICE_URL}/event/registerEvent`,
  deleteEventEndPoint: `${MAIN_SERVICE_URL}/event/deleteEvent/`,
  getEventEndPoint: `${MAIN_SERVICE_URL}/event/getEvent/`,
  updateEventEndPoint: `${MAIN_SERVICE_URL}/event/updateEvent/`,
  getEventsListEndPoint: `${MAIN_SERVICE_URL}/event/listEvents`,
  deleteContactEndPoint: `${MAIN_SERVICE_URL}/contact/deleteContact/`,
  getContactEndPoint: `${MAIN_SERVICE_URL}/contact/getContact/`,
  updateContactEndPoint: `${MAIN_SERVICE_URL}/contact/updateContact/`,
  getContactsListEndPoint: `${MAIN_SERVICE_URL}/contact/listContacts`,
  getStatsEndPoint: `${MAIN_SERVICE_URL}/stat/getStats`,
  exportCsvEndPoint: `${MAIN_SERVICE_URL}/contact/exportContacts`,
  addCustomAttributesEndPoint: `${MAIN_SERVICE_URL}/customAttribute/addCustomAttribute`,
  updateCustomAttributesEndPoint: `${MAIN_SERVICE_URL}/customAttribute/updateCustomAttribute`,
  deleteCustomAttributesEndPoint: `${MAIN_SERVICE_URL}/customAttribute/deleteCustomAttribute`,
  getCustomAttributesEndPoint: `${MAIN_SERVICE_URL}/customAttribute/getCustomAttribute/`,
  getCustomAttributesListEndPoint: `${MAIN_SERVICE_URL}/customAttribute/listCustomAttributes`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'JWT',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken'
}
