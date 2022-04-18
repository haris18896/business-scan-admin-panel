import React, { useEffect } from 'react'
import Spinner from '../common/Spinner'
import CountUp from 'react-countup'
import classNames from 'classnames'
import VisibilitySensor from 'react-visibility-sensor'

import { Sunrise, UserCheck, Users } from 'react-feather'
import Avatar from '@components/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Media, Row } from 'reactstrap'
import { handleFetchStats } from '../../redux/actions/stats'

function StatsCard({ cols }) {
  const dispatch = useDispatch()
  const { fetchStatsInProcess, statsData } = useSelector(state => state.getStats)

  useEffect(() => {
    dispatch(handleFetchStats())
  }, [])

  const data = [
    {
      title: (
        <CountUp end={`${statsData?.representativesCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Representatives',
      color: 'light-success',
      icon: <UserCheck size={32} />
    },
    {
      title: (
        <CountUp end={`${statsData?.eventsCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Events',
      color: 'light-primary',
      icon: <Sunrise size={32} />
    },
    {
      title: (
        <CountUp end={`${statsData?.contactsCount}`} redraw={true} duration={1}>
          {({ countUpRef, start }) => (
            <VisibilitySensor onChange={start} delayedCall>
              <span ref={countUpRef} />
            </VisibilitySensor>
          )}
        </CountUp>
      ),
      subtitle: 'Contacts',
      color: 'light-warning',
      icon: <Users size={32} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classNames({
            [`mb-2  mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media className='my-2 d-flex'>
            <Avatar color={item.color} icon={item.icon} className='mr-2 avatar__padding' />
            <Media className='my-auto' body>
              <h4 className='font-weight-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle className='text-secondary' tag='h4'>
          Statistics
        </CardTitle>
        <CardText className='card-text font-small-2 mr-25 mb-0'>Updated recently</CardText>
      </CardHeader>
      {fetchStatsInProcess ? (
        <Spinner />
      ) : (
        <CardBody className='statistics-body'>
          <Row>{renderData()}</Row>
        </CardBody>
      )}
    </Card>
  )
}

export default StatsCard
