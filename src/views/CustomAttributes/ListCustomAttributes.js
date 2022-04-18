import React, { Fragment, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from './data'

import { ChevronDown, RefreshCw } from 'react-feather'
import ReactPaginate from 'react-paginate'
import { Card, CardHeader, CardTitle, Col, Input, Label, Row } from 'reactstrap'
import {
  handleFetchCustomAttributesList,
  handlePageChangeCustomAttributes,
  handleSelectChangeCustomAttributes,
  resetCustomAttributesListState
} from '../../redux/actions/customAttributes/fetchAttributesListAction'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../common/Spinner'

function ListCustomAttributes() {
  const dispatch = useDispatch()

  const [parent, setParent] = useState('')
  const [category, setCategory] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const {
    attributesListInProcess,
    attributesListData,
    page,
    limit,
    totalPages,
    totalRecords,
    deleteInProcess,
    isDeleted
  } = useSelector(state => state.listCustomAttributes)

  const onChangeHandler = e => {
    const { name, value } = e.target
    if (name === 'searchKeyword') setSearchKeyword(value)
    if (name === 'parent') setParent(value)
    if (name === 'category') setCategory(value)
  }

  const handlePagination = page => {
    dispatch(handlePageChangeCustomAttributes(page, limit, parent, category, searchKeyword))
  }

  const handleLimitChange = e => {
    dispatch(handleSelectChangeCustomAttributes(e.target.value, limit, parent, category, searchKeyword))
  }

  useEffect(() => {
    dispatch(handleFetchCustomAttributesList(page, limit, parent, category, searchKeyword))
  }, [parent, category, searchKeyword, isDeleted])
  useEffect(() => {
    return () => {
      dispatch(resetCustomAttributesListState())
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

  const resetFilters = () => {
    setSearchKeyword('')
    setParent('')
    setCategory('')
  }

  return (
    <Fragment>
      <Card className='pb-2'>
        <CardHeader>
          <CardTitle tag='h4'>Custom Attributes List</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-75 justify-content-between'>
          <Col sm={12} md={6} lg={2} className='mb-1'>
            <div className='d-flex align-items-center'>
              <Label style={{ marginRight: '10px' }} className='mr-1' for='limit'>
                Show
              </Label>
              <Input
                style={{ width: '100px' }}
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
            <Label className='mr-1' style={{ marginRight: '15px' }} for='parent'>
              Parent
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='parent'
              placeholder='Search...'
              name='parent'
              onChange={onChangeHandler}
            />
          </Col>


          <Col sm={12} md={6} lg={4} className='mb-1'>
            <div className='d-flex align-items-center'>
              <Label style={{ marginRight: '10px' }} className='mr-1' for='category'>
                Category
              </Label>
              <Input className='dataTable-select mr-1' type='select' id='category' name='category' value={category} onChange={onChangeHandler}>
                <option value=''>Choose...</option>
                <option value='customerType'>Customer Type</option>
                <option value='businessType'>Business Type</option>
                <option value='tags'>Tags</option>
                <option value='priority'>Priority</option>
              </Input>
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

          <Col sm={6} lg={3} style={{ marginTop: 7 }}>
            <Label for='resetFilter' style={{ marginRight: '10px', whiteSpace: 'nowrap' }} className='mr-1'>
              Reset Filters
            </Label>
            <RefreshCw style={{ cursor: 'pointer' }} onClick={resetFilters} size={20} />
          </Col>
        </Row>

        {attributesListInProcess || deleteInProcess ? (
          <Spinner />
        ) : attributesListData?.customAttributes.length ? (
          <div className='react-dataTable'>
            <DataTable
              title='Attributes List'
              columns={columns}
              data={attributesListData?.customAttributes}
              theme='solarized'
              className='react-dataTable '
              sortIcon={<ChevronDown size={10} />}
              highlightOnHover
              pointerOnHover
            />
          </div>
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

export default ListCustomAttributes
