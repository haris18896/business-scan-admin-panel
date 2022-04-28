// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { UserCheck, LifeBuoy, Tag, AlertOctagon } from 'react-feather'
import ContentData from './customAttributes.js/CustomerType'

const CustomAttributesTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-1' style={{ margin: '0px 10px 0px 10px' }}>
        <NavItem>
          <NavLink active={active === 'customerType'} onClick={() => toggleTab('customerType')}>
            <UserCheck className='font-medium-3 me-50' />
            <span className='fw-bold'>Customer Type</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'businessType'} onClick={() => toggleTab('businessType')}>
            <LifeBuoy className='font-medium-3 me-50' />
            <span className='fw-bold'>Business Type</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'tags'} onClick={() => toggleTab('tags')}>
            <Tag className='font-medium-3 me-50' />
            <span className='fw-bold'>Tags</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === 'priority'} onClick={() => toggleTab('priority')}>
            <AlertOctagon className='font-medium-3 me-50' />
            <span className='fw-bold'>Priority</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active} style={{ margin: '0px 10px 0px 10px' }}>
        <TabPane tabId='customerType'>
          <ContentData type='customerType' />
        </TabPane>
        <TabPane tabId='businessType'>
          <ContentData type='businessType' />
        </TabPane>
        <TabPane tabId='tags'>
          <ContentData type='tags' />
        </TabPane>
        <TabPane tabId='priority'>
          <ContentData type='priority' />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default CustomAttributesTabs
