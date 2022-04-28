import React, { Fragment, useEffect } from 'react'
import Spinner from '../../common/Spinner'

import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardHeader, CardTitle, Table } from 'reactstrap'
import { Edit, Image, Trash } from 'react-feather'
import { handleFetchContact } from '../../../redux/actions/contacts/updateContact'

function ContactTable() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { contactProfile, isLoading, fetchContactSuccess } = useSelector(state => state.updateContact)

  useEffect(() => {
    dispatch(handleFetchContact(id))
  }, [])

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Update Contact Table</CardTitle>
        </CardHeader>

        {isLoading ? (
          <Spinner />
        ) : fetchContactSuccess ? (
          <Table responsive>
            <thead>
              <tr style={{ textAlign: 'center' }}>
                <th colSpan={1}>ID</th>
                <th>type</th>
                <th colSpan={2}>name</th>
                <th>job</th>
                <th>company</th>
                <th>email</th>
                <th>Mobile</th>
                <th>Phone</th>
                <th colSpan={3}>address</th>
                <th>imageUrl</th>
              </tr>
            </thead>

            <thead style={{ textAlign: 'center' }}>
              <tr>
                <th></th>
                <th></th>
                <th>firstname</th>
                <th>surname</th>
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
              <tr>
                <td>{contactProfile?.contact?._id.slice(-4)}</td>
                <td>{contactProfile?.contact?.type}</td>
                <td>{contactProfile?.contact?.name?.firstName}</td>
                <td>{contactProfile?.contact?.name?.surName}</td>
                <td>{contactProfile?.contact?.job}</td>
                <td>
                  <a className='text-black-50' target='__blank' href={contactProfile?.contact?.website}>
                    {contactProfile?.contact?.company}
                  </a>
                </td>
                <td>
                  <a className='text-black-50' target='__blank' href={`mailto:${contactProfile?.contact?.email}`}>
                    {contactProfile?.contact?.email}
                  </a>
                </td>
                <td>{contactProfile?.contact?.mobile}</td>
                <td>{contactProfile?.contact?.phone}</td>

                <td>{contactProfile?.contact?.address?.streetAddress}</td>
                <td>{contactProfile?.contact?.address?.city}</td>
                <td>{contactProfile?.contact?.address?.country}</td>
                <td>
                  <a target='__blank' href={`${contactProfile?.contact?.imageUrl}`}>
                    <Image style={{ cursor: 'pointer' }} className='mr-50 text-info' size={15} />
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <Card>
            <CardHeader>No Record Found!</CardHeader>
          </Card>
        )}
      </Card>
    </Fragment>
  )
}

export default ContactTable
