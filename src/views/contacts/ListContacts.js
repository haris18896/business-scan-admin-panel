import React, { Fragment, useEffect, useState } from 'react'
import classNames from 'classnames'
import Spinner from '../common/Spinner'
import { formatDate } from '@utils'
import Flatpickr from 'react-flatpickr'
import ReactPaginate from 'react-paginate'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { Link } from 'react-router-dom'
import { CSVDownload } from 'react-csv'
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
import { handleExportCSV, resetExportCsv } from '../../redux/actions/contacts/exportCSV'

function ListContacts() {
  const dispatch = useDispatch()

  const [type, setType] = useState('')
  const [createdDateFromFilter, setCreatedDateFromFilter] = useState('')
  const [createdDateToFilter, setCreatedDateToFilter] = useState('')
  const [dateTimeFilter, setDateTimeFilter] = useState('')
  const [eventIdFilter, setEventIdFilter] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')

  const { currentSkin } = useSelector(state => state.skin)
  const { eventsInProcess, eventListData } = useSelector(state => state.eventsList)
  const { exportData } = useSelector(state => state.exportContacts)
  const { inProcess, contactListData, totalRecords, totalPages, page, limit, deleteInProcess, isDeleted } = useSelector(
    state => state.contactList
  )

  const handlePagination = page => {
    dispatch(handlePageChange(page, limit, eventIdFilter, type, createdDateFromFilter, createdDateToFilter, searchKeyword))
  }

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    else if (name === 'eventIdFilter') setEventIdFilter(value)
  }

  const handleLimitChange = e => {
    dispatch(
      handleSelectChange(e.target.value, limit, eventIdFilter, type, createdDateFromFilter, createdDateToFilter, searchKeyword)
    )
  }

  const deleteEventHandler = eventId => {
    if (confirm(`Are you sure you want to delete the admin with ID: ${eventId} ?`)) {
      dispatch(handleDeleteContact(eventId, page, limit, searchKeyword))
    }
  }

  useEffect(() => {
    dispatch(handleFetchContactList(page, limit, eventIdFilter, type, createdDateFromFilter, createdDateToFilter, searchKeyword))
  }, [eventIdFilter, type, createdDateFromFilter, createdDateToFilter, searchKeyword])

  useEffect(() => {
    dispatch(handleFetchEventList(page, limit))
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

  const downloadCSV = () => {
    dispatch(handleExportCSV(page, limit, eventIdFilter, type, createdDateFromFilter, createdDateToFilter, searchKeyword))
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

  return (
    <Fragment>
      <Card>
        <Row className='mx-0 mt-1 mb-75 justify-content-Start'>
          <CardHeader className='border-bottom'>
            <Col sm={12} md={6} lg={3} className='mb-1'>
              <CardTitle tag='h4'>Contacts</CardTitle>
            </Col>
            <Col sm={12} md={6} lg={3} className='mb-1'>
              <Button
                type='submit'
                color={currentSkin === 'light' ? 'primary' : 'secondary'}
                block
                download
                onClick={() => downloadCSV()}
              >
                Download CSV
              </Button>
              {exportData && (
                <CSVDownload
                  style={{ textDecoration: 'none' }}
                  data={exportData}
                  filename={'contactsList.csv'}
                  target='_blank'
                ></CSVDownload>
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
                Event
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
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th colSpan={1}>ID</th>
                <th colSpan={3}>Event</th>
                <th>type</th>
                <th colSpan={2}>name</th>
                <th>imageUrl</th>
                <th>Actions</th>
                <th>job</th>
                <th>company</th>
                <th>email</th>
                <th colSpan={3}>address</th>
                <th>Created At</th>
              </tr>
            </thead>

            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th></th>
                <th>EventId</th>
                <th>name</th>
                <th>organizedBy</th>
                <th></th>
                <th>firstName</th>
                <th>surName</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>

                <th>streetAddress</th>
                <th>city</th>
                <th>country</th>
                <th></th>
              </tr>
            </thead>

            <tbody style={{ textAlign: 'center' }}>
              {contactListData?.contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact?._id.slice(-4)}</td>
                  <td>{contact?.event?._id}</td>
                  <td>{contact?.event?.name}</td>
                  <td>{contact?.event?.organizedBy}</td>
                  <td>{contact?.type}</td>
                  <td>{contact?.name?.firstName}</td>
                  <td>{contact?.name?.surName}</td>
                  <td>
                    <a target='__blank' href={`${contact?.imageUrl}`}>
                      <Image style={{ cursor: 'pointer' }} className='mr-50 text-info' size={15} />
                    </a>
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
                  <td>
                    <a className='text-black-50' target='__blank' href={contact?.website}>
                      {contact?.company}
                    </a>
                  </td>
                  <td>
                    <a className='text-black-50' target='__blank' href={`mailto:${contact?.email}`}>
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
