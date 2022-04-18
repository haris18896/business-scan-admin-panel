import navbar from './navbar'
import layout from './layout'
import { authReducer } from './reducers/auth'
import { profileUpdateReducer } from './reducers/admin/profileUpdateReducer'
import { updatePasswordReducer } from './reducers/admin/updatePasswordReducer'
import { registerRepresentativeReducer } from './reducers/representative/registerRepresentativeReducer'
import { getRepresentativeById } from './reducers/representative/getRepresentativeById'
import { updateRepresentativeReducer } from './reducers/representative/updateRepresentativeReducer'
import { representativeListReducer } from './reducers/representative/fetchRepresentativeListReducer'
import { registerEventReducer } from './reducers/event/registerEventReducer'
import { updateEventReducer } from './reducers/event/updateEventReducer'
import { eventListReducer } from './reducers/event/fetchEventReducerList'
import { contactListReducer } from './reducers/contacts/fetchContactListReducer'
import { updateContactReducer } from './reducers/contacts/updateContactReducer'
import { getStatsReducer } from './reducers/stats'
import { exportContactReducer } from './reducers/contacts/exportContactsReducer'
import skinReducer from './reducers/skin'
import { addCustomAttributeReducer } from './reducers/customAttributes/addCustomAttributesReducer'
import { listCustomAttributesReducer } from './reducers/customAttributes/listCustomAttributesReducer'
import { updateCustomAttributesReducer } from './reducers/customAttributes/updateCustomAttributesReducer'

const rootReducer = {
  auth: authReducer,
  navbar,
  layout,
  skin: skinReducer,
  getStats: getStatsReducer,
  profileUpdate: profileUpdateReducer,
  passwordUpdate: updatePasswordReducer,
  registerRepresentative: registerRepresentativeReducer,
  getRepresentative: getRepresentativeById,
  updateRepresentative: updateRepresentativeReducer,
  representativeList: representativeListReducer,
  registerEvent: registerEventReducer,
  updateEvent: updateEventReducer,
  eventsList: eventListReducer,
  updateContact: updateContactReducer,
  contactList: contactListReducer,
  exportContacts: exportContactReducer,
  listCustomAttributes: listCustomAttributesReducer,
  addCustomAttributes: addCustomAttributeReducer,
  updateCustomAttributes: updateCustomAttributesReducer
}

export default rootReducer
