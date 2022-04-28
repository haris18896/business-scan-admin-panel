import axios from 'axios'
import moment from 'moment'
import jwtDefaultConfig from './jwtDefaultConfig'

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    axios.interceptors.request.use(
      config => {
        const accessToken = this.getToken()
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      response => response,
      error => {
        const { response } = error
        if (response && response.status === 406) {
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  refreshToken() {
    return axios.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    })
  }

  login(data) {
    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  getStats() {
    return axios.get(this.jwtConfig.getStatsEndPoint)
  }

  fetchProfile() {
    return axios.get(this.jwtConfig.fetchProfileEndPoint)
  }

  updateProfile(data) {
    return axios.put(this.jwtConfig.updateAdminProfile, data)
  }

  updatePassword(data) {
    return axios.put(this.jwtConfig.updatePasswordEndPoint, data)
  }

  registerRepresentative(data) {
    return axios.post(this.jwtConfig.registerRepresentativeEndpoint, data)
  }

  getRepresentative(_id) {
    return axios.get(`${this.jwtConfig.getRepresentativeEndPoint}${_id}`)
  }

  updateRepresentative(_id, data) {
    return axios.put(`${this.jwtConfig.updateRepresentativeEndPoint}${_id}`, data)
  }

  getRepresentativeList(page, limit, searchKeyword = null) {
    let endpoint = `${this.jwtConfig.getRepresentativeListEndPoint}?page=${page}&limit=${limit}`

    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endpoint)
  }

  registerEvent(data) {
    return axios.post(this.jwtConfig.registerEventEndpoint, data)
  }

  deleteEvent(id) {
    const endPoint = `${this.jwtConfig.deleteEventEndPoint}${id}`
    return axios.delete(endPoint)
  }

  getEvent(id) {
    return axios.get(`${this.jwtConfig.getEventEndPoint}${id}`)
  }

  updateEvent(id, data) {
    return axios.put(`${this.jwtConfig.updateEventEndPoint}${id}`, data)
  }

  getEventList(page, limit, startDateFromFilter, startDateToFilter, searchKeyword = null) {
    let endpoint = `${this.jwtConfig.getEventsListEndPoint}?page=${page}&limit=${limit}`

    if (startDateFromFilter) {
      startDateFromFilter = new Date(startDateFromFilter).toISOString().split('T')[0]
      endpoint = `${endpoint}&startDateFrom=${startDateFromFilter}`
    }

    if (startDateToFilter) {
      startDateToFilter = new Date(startDateToFilter.setDate(startDateToFilter.getDate() + 1)).toISOString().split('T')[0]
      endpoint = `${endpoint}&startDateTo=${startDateToFilter}`
    }

    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endpoint)
  }

  deleteContact(id) {
    const endPoint = `${this.jwtConfig.deleteContactEndPoint}${id}`
    return axios.delete(endPoint)
  }

  getContact(id) {
    return axios.get(`${this.jwtConfig.getContactEndPoint}${id}`)
  }

  updateContact(id, data) {
    return axios.put(`${this.jwtConfig.updateContactEndPoint}${id}`, data)
  }

  getContactList(
    page,
    limit,
    eventIdFilter,
    representativeFilter,
    type,
    createdDateFromFilter,
    createdDateToFilter,
    searchKeyword = null
  ) {
    let endpoint = `${this.jwtConfig.getContactsListEndPoint}?page=${page}&limit=${limit}`

    if (eventIdFilter) {
      endpoint = `${endpoint}&eventId=${eventIdFilter}`
    }

    if (representativeFilter) {
      endpoint = `${endpoint}&representativeId=${representativeFilter}`
    }

    if (type) {
      endpoint = `${endpoint}&type=${type}`
    }

    if (createdDateFromFilter) {
      createdDateFromFilter = new Date(createdDateFromFilter).toISOString().split('T')[0]
      endpoint = `${endpoint}&creationDateFrom=${createdDateFromFilter}`
    }

    if (createdDateToFilter) {
      createdDateToFilter = new Date(createdDateToFilter.setDate(createdDateToFilter.getDate() + 1)).toISOString().split('T')[0]
      endpoint = `${endpoint}&creationDateTo=${createdDateToFilter}`
    }

    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }

    return axios.get(endpoint)
  }

  exportCsvContactList(
    page,
    limit,
    eventIdFilter,
    representativeFilter,
    type,
    createdDateFromFilter,
    createdDateToFilter,
    searchKeyword = null
  ) {
    let endpoint = `${this.jwtConfig.exportCsvEndPoint}?page=${page}&limit=${limit}`

    if (eventIdFilter) {
      endpoint = `${endpoint}&eventId=${eventIdFilter}`
    }

    if (representativeFilter) {
      endpoint = `${endpoint}&representativeId=${representativeFilter}`
    }

    if (type) {
      endpoint = `${endpoint}&type=${type}`
    }

    if (createdDateFromFilter) {
      createdDateFromFilter = new Date(createdDateFromFilter).toISOString().split('T')[0]
      endpoint = `${endpoint}&creationDateFrom=${createdDateFromFilter}`
    }

    if (createdDateToFilter) {
      createdDateToFilter = new Date(createdDateToFilter.setDate(createdDateToFilter.getDate() + 1)).toISOString().split('T')[0]
      endpoint = `${endpoint}&creationDateTo=${createdDateToFilter}`
    }

    if (searchKeyword) {
      endpoint = `${endpoint}&searchKeyword=${searchKeyword}`
    }
    // to download csv directly as a blob
    axios({
      url: endpoint,
      method: 'GET',
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `contactList_${moment().format()}.csv`)
      document.body.appendChild(link)
      link.click()
    })
  }

  addCustomAttributes(data) {
    const endpoint = `${this.jwtConfig.addCustomAttributesEndPoint}`
    return axios.post(endpoint, data)
  }

  getCustomAttributes(id) {
    const endpoint = `${this.jwtConfig.getCustomAttributesEndPoint}`
    return axios.get(endpoint, { params: { attributeId: `${id}` } })
  }

  updateCustomAttributes(id, data) {
    const endpoint = `${this.jwtConfig.updateCustomAttributesEndPoint}?attributeId=${id}`
    return axios.put(endpoint, data)
  }

  deleteCustomAttributes(id) {
    const endpoint = `${this.jwtConfig.deleteCustomAttributesEndPoint}`
    return axios.post(endpoint, id)
  }

  getCustomAttributeList(page, limit, parent, category, searchKeyword = null) {
    const endpoint = `${this.jwtConfig.getCustomAttributesListEndPoint}?page=${page}&limit=${limit}`
    return axios.get(endpoint, { params: { parent: `${parent}`, category: `${category}`, searchKeyword: `${searchKeyword}` } })
  }
}
