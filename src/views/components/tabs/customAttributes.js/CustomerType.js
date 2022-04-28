import React, { Fragment } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { useSelector } from 'react-redux'
import { Card, CardHeader } from 'reactstrap'
import Spinner from '../../../common/Spinner'
import { columns } from '../../../CustomAttributes/data'

function ContentData() {
  const { attributesListInProcess, attributesListData, deleteInProcess } = useSelector(state => state.listCustomAttributes)

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default ContentData
