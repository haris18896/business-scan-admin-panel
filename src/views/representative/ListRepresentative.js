import React, { Fragment, useEffect, useState, memo } from 'react'
import ReactPaginate from 'react-paginate'
import { formatDate } from '@utils'
import Spinner from '../common/Spinner'

import { Edit, RefreshCw } from 'react-feather'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, Col, Input, Label, Row, Table } from 'reactstrap'
import {
  handleFetchRepresentativeList,
  handlePageChange,
  handleSelectChange,
  resetRepresentativeListState
} from '../../redux/actions/representative/fetchRepresentativeList'

function ListRepresentative() {
  const dispatch = useDispatch()

  const [searchKeyword, setSearchKeyword] = useState('')
  const { inProcess, representativeListData, totalRecords, page, limit, totalPages } = useSelector(
    state => state.representativeList
  )

  const handlePagination = page => {
    dispatch(handlePageChange(page, limit, searchKeyword))
  }

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
  }

  const handleLimitChange = e => {
    dispatch(handleSelectChange(e.target.value, limit, searchKeyword))
  }

  useEffect(() => {
    dispatch(handleFetchRepresentativeList(page, limit, searchKeyword))
  }, [searchKeyword])

  useEffect(() => {
    return () => {
      dispatch(resetRepresentativeListState())
    }
  }, [])

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
          <CardTitle tag='h4'>Representatives</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-75 justify-content-between'>
          <Col sm={12} md={6} lg={4} className='mb-1'>
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

          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center justify-content-lg-start'>
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
            </div>
          </Col>
        </Row>

        {inProcess ? (
          <Spinner />
        ) : representativeListData && representativeListData?.representatives.length > 0 ? (
          <Table responsive>
            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>created at</th>
                <th>updated at</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: 'center' }}>
              {representativeListData?.representatives.map((representative, index) => (
                <tr key={index}>
                  <td>{representative._id}</td>
                  <td style={{ textTransform: 'capitalize' }}>{representative.name}</td>
                  <td>{representative.email}</td>
                  <td>{formatDate(representative.createdAt)}</td>
                  <td>{formatDate(representative.updatedAt)}</td>
                  <td>
                    <Link to={`/update-representative/${representative._id}`}>
                      <Edit style={{ cursor: 'pointer' }} className='mr-50 text-success' size={15} />
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

export default memo(ListRepresentative)
