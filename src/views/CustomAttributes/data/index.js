import { Fragment } from 'react'
import { Trash, Edit } from 'react-feather'
import { createTheme } from 'react-data-table-component'
import { handleDeleteAttributes } from '../../../redux/actions/customAttributes/deleteAttributesAction'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

createTheme(
  'solarized',
  {
    text: {
      primary: '#',
      secondary: '#2aa198'
    },
    background: {
      default: 'transparent'
    },
    context: {
      background: '#e3f2fd',
      text: '#000'
    },
    divider: {
      default: 'rgba(216, 214, 222, 0.1)'
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)'
    }
  },
  'dark'
)

export const columns = [
  {
    name: 'ID',
    sortable: false,
    minWidth: '150px',
    cell: row => row._id
  },
  {
    name: 'Parent',
    sortable: false,
    minWidth: '150px',
    cell: row => row.parent
  },
  {
    name: 'Category',
    sortable: false,
    minWidth: '150px',
    cell: row => row.category
  },
  {
    name: 'Type',
    sortable: false,
    minWidth: '150px',
    selector: row => row.type
  },
  {
    name: 'Created At',
    sortable: false,
    minWidth: '150px',
    // selector: row => row.date
    selector: row => new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(row.createdAt))
  },

  {
    name: 'Actions',
    allowOverflow: true,
    cell: (row, index) => {
      const dispatch = useDispatch()
      const deleteEventHandler = id => {
        if (confirm(`Are you sure you want to delete the attribute with ID: ${id} ?`)) {
          const data = {
            attributeId: id
          }
          dispatch(handleDeleteAttributes(data))
        }
      }

      return (
        <>
          <div key={index} className='d-flex'>
            <Link to={`/update-attributes/${row._id}`} style={{ marginRight: '8px' }}>
              <Edit style={{ cursor: 'pointer' }} className='mr-50 text-success' size={15} />
            </Link>
            <Trash
              onClick={() => deleteEventHandler(row?._id)}
              style={{ cursor: 'pointer' }}
              className={classNames({ 'mr-50 text-danger': true })}
              size={15}
            />
          </div>
        </>
      )
    }
  }
]
