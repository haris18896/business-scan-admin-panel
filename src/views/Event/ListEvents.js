import React, { Fragment, useEffect, useState, memo } from 'react'
import Spinner from '../common/Spinner'
import { formatDate } from '@utils'
import classNames from 'classnames'
import Flatpickr from 'react-flatpickr'
import ReactPaginate from 'react-paginate'
import '@styles/react/libs/flatpickr/flatpickr.scss'

import { Link } from 'react-router-dom'
import { Edit, RefreshCw, Trash } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import {
  handleFetchEventList,
  handlePageChange,
  handleSelectChange,
  resetEventListState
} from '../../redux/actions/event/fetchEventList'
import { handleDeleteEvent } from '../../redux/actions/event/deleteEvent'

function ListEvents() {
  const dispatch = useDispatch()

  const [startDateFromFilter, setStartDateFromFilter] = useState('')
  const [startDateToFilter, setStartDateToFilter] = useState('')
  const [dateTimeFilter, setDateTimeFilter] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const { eventsInProcess, eventListData, totalRecords, page, limit, totalPages, deleteInProcess, isDeleted } = useSelector(
    state => state.eventsList
  )

  const handlePagination = page => {
    dispatch(handlePageChange(page, limit, startDateFromFilter, startDateToFilter, searchKeyword))
  }

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
  }

  const handleLimitChange = e => {
    dispatch(handleSelectChange(e.target.value, limit, startDateFromFilter, startDateToFilter, searchKeyword))
  }

  const deleteEventHandler = eventId => {
    if (confirm(`Are you sure you want to delete the admin with ID: ${eventId} ?`)) {
      dispatch(handleDeleteEvent(eventId, page, limit, searchKeyword))
    }
  }

  useEffect(() => {
    dispatch(handleFetchEventList(page, limit, startDateFromFilter, startDateToFilter, searchKeyword))
  }, [startDateFromFilter, startDateToFilter, searchKeyword])

  useEffect(() => {
    return () => {
      dispatch(resetEventListState())
    }
  }, [])

  const onDateChangeHandler = dates => {
    if (dates.length === 1) {
      setStartDateFromFilter(dates[0])
      setDateTimeFilter('')
    }
    if (dates.length === 2) {
      setStartDateFromFilter(dates[0])
      setStartDateToFilter(dates[1])
    }
  }

  const resetFilters = () => {
    setStartDateFromFilter('')
    setStartDateToFilter('')
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
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Events</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-75 justify-content-between'>
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
              id='searchKeyword'
              placeholder='Search...'
              name='searchKeyword'
              onChange={onChangeHandler}
            />
          </Col>

          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
              <Label for='startDateFrom' style={{ marginRight: '15px', whiteSpace: 'nowrap' }} className='mr-1'>
                Created At Range
              </Label>
              <Flatpickr
                id='startDateFrom'
                name='startDateFrom'
                value={dateTimeFilter}
                className='form-control'
                placeholder='Event Date Range'
                onChange={onDateChangeHandler}
                options={{
                  mode: 'range',
                  enableTime: false
                }}
              />
            </div>
          </Col>

          <Col sm={6} lg={4} style={{ marginTop: 7 }}>
            <Label for='resetFilter' style={{ marginRight: '10px', whiteSpace: 'nowrap' }} className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
        </Row>

        {eventsInProcess || deleteInProcess ? (
          <Spinner />
        ) : eventListData?.events ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Venue</th>
                <th>ORGANIZED BY</th>
                <th>QUESTIONS</th>
                <th>STARTED AT</th>
                <th>END AT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {eventListData?.events.map((event, index) => (
                <tr key={index}>
                  <td>{event._id}</td>
                  <td>{event.name}</td>
                  <td>{event.venue}</td>
                  <td>{event.organizedBy}</td>
                  <td>{event.questions}</td>
                  <td>{formatDate(event.startDate)}</td>
                  <td>{formatDate(event.endDate)}</td>
                  <td>
                    <Link to={`/update-event/${event._id}`} style={{ marginRight: '8px' }}>
                      <Edit style={{ cursor: 'pointer' }} className='mr-50 text-success' size={15} />
                    </Link>
                    <Link to={isDeleted ? '/list-event' : '/list-event'}>
                      <Trash
                        onClick={() => deleteEventHandler(event._id)}
                        style={{ cursor: 'pointer' }}
                        className={classNames({ 'mr-50 text-danger': true })}
                        size={15}
                      />
                    </Link>
                  </td>
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

export default memo(ListEvents)
