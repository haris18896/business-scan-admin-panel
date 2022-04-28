import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import Spinner from '../common/Spinner'
import { formatDate } from '@utils'
import Flatpickr from 'react-flatpickr'
import ReactPaginate from 'react-paginate'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { Link } from 'react-router-dom'
import { Edit, Trash, Image, RefreshCw } from 'react-feather'
import { Button, Card, CardHeader, CardTitle, Col, FormGroup, Input, Label, Row, Table } from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  handleFetchContactList,
  handlePageChange,
  handleSelectChange,
  resetContactListState
} from '../../redux/actions/contacts/fetchContactList'
import { handleDeleteContact } from '../../redux/actions/contacts/deleteContact'
import { handleFetchEventList } from '../../redux/actions/event/fetchEventList'
import { resetExportCsv } from '../../redux/actions/contacts/exportCSV'
import { handleFetchRepresentativeList } from '../../redux/actions/representative/fetchRepresentativeList'
import { CSVLink } from 'react-csv'
import moment from 'moment'

function ListContacts() {
  const dispatch = useDispatch()

  const [type, setType] = useState('')
  const [createdDateFromFilter, setCreatedDateFromFilter] = useState('')
  const [createdDateToFilter, setCreatedDateToFilter] = useState('')
  const [dateTimeFilter, setDateTimeFilter] = useState('')
  const [eventIdFilter, setEventIdFilter] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [representativeFilter, setRepresentativeFilter] = useState('')

  const { currentSkin } = useSelector(state => state.skin)
  const { eventsInProcess, eventListData } = useSelector(state => state.eventsList)
  const { representativeListData } = useSelector(state => state.representativeList)
  const { exportData } = useSelector(state => state.exportContacts)
  const { inProcess, contactListData, totalRecords, totalPages, page, limit, deleteInProcess, isDeleted } = useSelector(
    state => state.contactList
  )

  const handlePagination = page => {
    dispatch(
      handlePageChange(
        page,
        limit,
        eventIdFilter,
        representativeFilter,
        type,
        createdDateFromFilter,
        createdDateToFilter,
        searchKeyword
      )
    )
  }

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'eventIdFilter') setEventIdFilter(value)
    else if (name === 'representativeFilter') setRepresentativeFilter(value)
  }

  const handleLimitChange = e => {
    dispatch(
      handleSelectChange(
        e.target.value,
        limit,
        eventIdFilter,
        representativeFilter,
        type,
        createdDateFromFilter,
        createdDateToFilter,
        searchKeyword
      )
    )
  }

  const deleteEventHandler = eventId => {
    if (confirm(`Are you sure you want to delete the admin with ID: ${eventId} ?`)) {
      dispatch(handleDeleteContact(eventId, page, limit, searchKeyword))
    }
  }

  useEffect(() => {
    dispatch(
      handleFetchContactList(
        page,
        limit,
        eventIdFilter,
        representativeFilter,
        type,
        createdDateFromFilter,
        createdDateToFilter,
        searchKeyword
      )
    )
  }, [eventIdFilter, representativeFilter, type, createdDateFromFilter, createdDateToFilter, searchKeyword])

  useEffect(() => {
    dispatch(handleFetchEventList(page, limit))
  }, [])

  useEffect(() => {
    dispatch(handleFetchRepresentativeList(page, limit))
  }, [])

  useEffect(() => {
    return () => {
      dispatch(resetContactListState(page, limit))
    }
  }, [])

  const onTypeChangeHandler = e => {
    setType(e.target.value)
  }

  const onDateChangeHandler = dates => {
    if (dates.length === 1) {
      setCreatedDateFromFilter(dates[0])
      setDateTimeFilter('')
    }
    if (dates.length === 2) {
      setCreatedDateFromFilter(dates[0])
      setCreatedDateToFilter(dates[1])
    }
  }

  useEffect(() => {
    if (exportData) {
      dispatch(resetExportCsv())
    }
  }, [exportData])

  const resetFilters = () => {
    setType('')
    setEventIdFilter('')
    setCreatedDateFromFilter('')
    setCreatedDateToFilter('')
    setDateTimeFilter([])
    setSearchKeyword('')
    setRepresentativeFilter('')
  }

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel='...'
        pageCount={totalPages || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName='active'
        forcePage={page !== 0 ? page - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'}
      />
    )
  }

  const createCsvFileName = () => `contactList_${moment().format()}.csv`
  const headers = [
    { label: 'ID', key: '_id' },
    { label: 'Event ID', key: 'event._id' },
    { label: 'Event name', key: 'event.name' },
    { label: 'Event Organized By', key: 'event.organizedBy' },
    { label: 'First Name', key: 'name.firstName' },
    { label: 'Middle Name', key: 'name.middleName' },
    { label: 'surName', key: 'name.surName' },
    { label: 'Job', key: 'job' },
    { label: 'Company', key: 'company' },
    { label: 'Website', key: 'website' },
    { label: 'Email', key: 'email' },
    { label: 'Phone', key: 'phone' },
    { label: 'Mobile', key: 'mobile' },
    { label: 'Fax', key: 'fax' },
    { label: 'Address', key: 'address' },
    { label: 'Type', key: 'type' },
    { label: 'ImageUrl', key: 'imageUrl' },
    { label: 'Tags', key: 'tags' },
    { label: 'Notes', key: 'notes' },
    { label: 'CustomerType', key: 'customerType' },
    { label: 'BusinessType', key: 'customAttributes.businessType' },
    { label: 'Attributes Tags', key: 'customAttributes.tags' },
    { label: 'Description', key: 'customAttributes.description' },
    { label: 'Priority', key: 'customAttributes.priority' },
    { label: 'Responsible', key: 'customAttributes.responsible' },
    { label: 'Question', key: 'questionnaire.question' },
    { label: 'Answer', key: 'questionnaire.answer' },
    { label: 'Representative ID', key: 'representative._id' },
    { label: 'Representative Name', key: 'representative.name' },
    { label: 'Representative Email', key: 'representative.email' },
    { label: 'createdAt', key: 'createdAt' }
  ]

  const data = contactListData?.contacts.map(contact => {
    return {
      _id: contact?._id.slice(-4),
      event: { _id: contact?.event?._id, name: contact?.event?.name, organizedBy: contact?.event?.organizedBy },
      name: {
        firstName: contact?.name?.firstName,
        middleName: contact?.name?.middleName,
        surName: contact?.name?.surName
      },
      job: contact?.job,
      company: contact?.company,
      website: contact?.website,
      email: contact?.email,
      phone: contact?.phone,
      mobile: contact?.mobile,
      fax: contact?.fax,
      address: `${contact?.address?.streetAddress} ${contact?.address?.city} ${contact?.address?.country}`,
      type: contact?.type,
      imageUrl: contact?.imageUrl,
      tags: contact?.tags.map(tag => tag),
      notes: contact?.notes,
      customerType: contact?.customerType,

      customAttributes: {
        businessType: contact?.customAttributes.map(_ => _.businessType),
        tags: contact?.customAttributes.map(customAttributeTags => customAttributeTags?.tags.map(tag => tag)),
        description: contact?.customAttributes.map(_ => _.description),
        priority: contact?.customAttributes.map(_ => _.priority),
        responsible: contact?.customAttributes.map(_ => _.responsible)
      },

      questionnaire: {
        question: contact?.questionnaire.map(_ => _.question),
        answer: contact?.questionnaire.map(_ => _.answer)
      },
      representative: {
        _id: contact?.representative?._id,
        name: contact?.representative?.name,
        email: contact?.representative?.email
      },
      createdAt: contact?.createdAt
    }
  })

  return (
    <Fragment>
      <Card>
        <Row className='mx-0 mt-1 mb-75 justify-content-Start'>
          <CardHeader className='border-bottom'>
            <Col sm={12} md={6} lg={3} className='mb-1'>
              <CardTitle tag='h4'>Contacts</CardTitle>
            </Col>
            <Col sm={12} md={6} lg={3} className='mb-1'>
              {contactListData?.contacts && (
                <CSVLink
                  data={data}
                  headers={headers}
                  filename={createCsvFileName()}
                  target='_blank'
                  style={{ textDecoration: 'none', outline: 'none', height: '5vh' }}
                >
                  <Button variant='contained' color={currentSkin === 'light' ? 'primary' : 'secondary'} block>
                    Download CSV
                  </Button>
                </CSVLink>
              )}
            </Col>
          </CardHeader>
        </Row>

        <Row className='mx-0 mt-1 mb-75 justify-content-start'>
          <Col sm={12} md={6} lg={3} className='mb-1'>
            <div className='d-flex align-items-center'>
              <Label style={{ marginRight: '10px' }} className='mr-1' for='limit'>
                Show
              </Label>
              <Input
                style={{ width: '70px' }}
                className='dataTable-select mr-1'
                type='select'
                id='limit'
                name='limit'
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Input>
              <Label for='limit' style={{ marginLeft: '10px' }}>
                Records
              </Label>
            </div>
          </Col>

          <Col sm={12} md={6} lg={5} className='d-flex align-items-center justify-content-sm-end mb-1 mt-sm-0 mt-1'>
            <Label className='mr-1' style={{ marginRight: '15px' }} for='searchKeyword'>
              Search
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              placeholder='Search...'
              id='searchKeyword'
              name='searchKeyword'
              onChange={onChangeHandler}
            />
          </Col>

          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='startDateFrom' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                Event Date Range
              </Label>
              <Flatpickr
                id='startDateFrom'
                name='startDateFrom'
                placeholder='Event Date Range'
                value={dateTimeFilter}
                className='form-control'
                onChange={onDateChangeHandler}
                options={{
                  mode: 'range',
                  enableTime: false
                }}
              />
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='type' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                Type
              </Label>

              <Input
                style={{ width: '180px' }}
                className='dataTable-select mr-1'
                type='select'
                id='type'
                name='type'
                value={type}
                onChange={onTypeChangeHandler}
              >
                <option value=''>Choose...</option>
                <option value='qrcode'>QR-Code</option>
                <option value='businesscard'>Business Card</option>
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='eventIdFilter' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                Events
              </Label>

              <Input
                style={{ width: '180px' }}
                className='dataTable-select mr-1 '
                type='select'
                id='eventIdFilter'
                name='eventIdFilter'
                value={eventIdFilter}
                onChange={onChangeHandler}
              >
                <option value=''>Choose...</option>
                {eventsInProcess ? (
                  <option value=''>Loading...</option>
                ) : (
                  eventListData?.events.map(eventFilter => (
                    <option key={eventFilter._id} value={eventFilter._id}>
                      {eventFilter.name}
                    </option>
                  ))
                )}
              </Input>
            </div>
          </Col>

          <Col sm={12} md={6} lg={3} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='representativeFilter' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                Representatives
              </Label>

              <Input
                style={{ width: '180px' }}
                className='dataTable-select mr-1 '
                type='select'
                id='representativeFilter'
                name='representativeFilter'
                value={representativeFilter}
                onChange={onChangeHandler}
              >
                <option value=''>Choose...</option>
                {representativeListData?.representatives.map(representative => (
                  <option key={representative._id} value={representative._id}>
                    {representative.name}
                  </option>
                ))}
              </Input>
            </div>
          </Col>

          <Col sm={6} lg={3} style={{ marginTop: 7 }}>
            <Label for='resetFilter' style={{ marginRight: '10px' }} className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
        </Row>

        {inProcess || deleteInProcess ? (
          <Spinner />
        ) : contactListData?.contacts ? (
          <Table responsive>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>id</th>
                <th>Representative</th>
                <th colSpan={3}>event</th>
                <th>type</th>
                <th colSpan={2}>name</th>
                <th>imageUrl</th>
                <th>actions</th>
                <th>job</th>
                <th>company</th>
                <th>Website</th>
                <th>email</th>
                <th colSpan={3}>address</th>
                <th>created at</th>
              </tr>
            </thead>

            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th></th>
                <th></th>
                <th>eventId</th>
                <th>name</th>
                <th>organized by</th>
                <th></th>
                <th>firstname</th>
                <th>surname</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>

                <th>street address</th>
                <th>city</th>
                <th>country</th>
                <th></th>
              </tr>
            </thead>

            <tbody style={{ textAlign: 'center' }}>
              {contactListData?.contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact?._id.slice(-6)}</td>
                  <td>
                    {(contact?.representative && (
                      <a target='__blank' href={`/view-representative/${contact?.representative?._id}`}>
                        {contact?.representative?.name}
                      </a>
                    )) ||
                      'N/A'}
                  </td>

                  <td>{contact?.event?._id}</td>
                  <td>{contact?.event?.name}</td>
                  <td>{contact?.event?.organizedBy}</td>
                  <td>{contact?.type}</td>
                  <td>{contact?.name?.firstName}</td>
                  <td>{contact?.name?.surName}</td>
                  <td>
                    {contact?.imageUrl && (
                      <a target='__blank' href={`${contact?.imageUrl}`}>
                        <Image style={{ cursor: 'pointer' }} className='mr-50 text-info' size={15} />
                      </a>
                    )}
                  </td>
                  <td>
                    <Link to={`/update-contact/${contact?._id}`} style={{ marginRight: '10px' }}>
                      <Edit style={{ cursor: 'pointer' }} className='mr-50 text-success' size={15} />
                    </Link>
                    <Link to={isDeleted ? '/list-contacts' : '/list-contacts'}>
                      <Trash
                        onClick={() => deleteEventHandler(contact?._id)}
                        style={{ cursor: 'pointer' }}
                        className={classNames({ 'text-danger': true })}
                        size={15}
                      />
                    </Link>
                  </td>
                  <td>{contact?.job}</td>
                  <td>{contact?.company}</td>
                  <td>
                    <a target='_blank' href={contact?.website}>
                      {contact?.website}
                    </a>
                  </td>
                  <td>
                    <a target='_blank' href={`mailto:${contact?.email}`}>
                      {contact?.email}
                    </a>
                  </td>

                  <td>{contact?.address?.streetAddress}</td>
                  <td>{contact?.address?.city}</td>
                  <td>{contact?.address?.country}</td>
                  <td>{formatDate(contact?.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Card>
            <CardHeader>No Record Found!</CardHeader>
          </Card>
        )}

        <Row className='mx-0 justify-content-between'>
          <Col className='mt-1' sm='12' md={6}>
            <span>
              <b>Total Records:</b> {totalRecords}
            </span>
          </Col>
          <Col sm='12' md={6}>
            <CustomPagination />
          </Col>
        </Row>
      </Card>
    </Fragment>
  )
}

export default ListContacts
