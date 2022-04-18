import React, { useEffect } from 'react'
import * as Yup from 'yup'
import validator from 'validator'
import classNames from 'classnames'
import Spinner from '../common/Spinner'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchEvent, handleUpdateEvent, resetUpdateEventState } from '../../redux/actions/event/updateEvent'
import moment from 'moment'

function UpdateEvent() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  
  const { currentSkin } = useSelector(state => state.skin)
  const { isLoading, updateEventInProcess, eventProfile, updateEventProfile, error } = useSelector(state => state.updateEvent)

  useEffect(() => {
    dispatch(handleFetchEvent(id))
  }, [])

  const updateEventSchema = Yup.object().shape({
    eventId: Yup.string()
      .min(7, 'id must be at least 7 characters long')
      .test('id', 'id must not contain special characters', value => {
        if (!value) return true
        return validator.isAlphanumeric(value, 'en-US', { ignore: ' -' })
      }),
    name: Yup.string()
      .required('Name is a required field!')
      .min(4, 'Name must contain at least 4 characters')
      .max(40, 'Name must not exceed 40 characters'),
    venue: Yup.string()
      .required('Venue is a required field!')
      .min(4, 'Venue must contain at least 4 characters')
      .max(100, 'Venue must not exceed 100 characters'),
    organizedBy: Yup.string().max(60, 'Organized By must not exceed 60 characters'),
    questions: Yup.string().required('Questions is a required field!'),
    startDate: Yup.date(),
    endDate: Yup.date().min(Yup.ref('startDate'), 'End Date must be greater than Start Date')
  })

  const formik = useFormik({
    initialValues: {
      eventId: eventProfile?.event?.eventId || '',
      name: eventProfile?.event?.name || '',
      venue: eventProfile?.event?.venue || '',
      organizedBy: eventProfile?.event?.organizedBy || '',
      questions: eventProfile?.event?.questions.join('\n') || '',
      startDate: eventProfile?.event?.startDate ? moment(eventProfile?.event?.startDate).format('YYYY-MM-DD') : eventProfile?.event?.startDate === null ? '' : '',
      endDate: eventProfile?.event?.endDate ? moment(eventProfile?.event?.endDate).format('YYYY-MM-DD') : eventProfile?.event?.endDate === null ? '' : ''
    },
    enableReinitialize: true,
    validationSchema: updateEventSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const { eventId, name, venue, organizedBy, questions, startDate, endDate } = values
        const data = {
          eventId,
          name,
          venue,
          organizedBy,
          questions: questions.split('\n'),
          startDate,
          endDate
        }
        dispatch(handleUpdateEvent(id, data))
      }
    }
  })


  useEffect(() => {
    if (updateEventProfile?.success) {
      formik.resetForm()
      history.push('/list-event')
    }
  }, [updateEventProfile?.success])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateEventState())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle >Update Event</CardTitle>
      </CardHeader>

      {/* loading here */}
      {isLoading || updateEventInProcess ? (
        <Spinner />
      ) : eventProfile?.success ? (
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' htmlFor='eventId'>
                    EventId (optional)
                  </Label>
                  <Input
                    autoFocus
                    type='text'
                    name='eventId'
                    id='eventId'
                    placeholder={eventProfile?.event._id}
                    className={classNames({ 'is-invalid': formik.touched.eventId && formik.errors.eventId })}
                    {...formik.getFieldProps('eventId')}
                  />
                  {formik.touched.eventId && formik.errors.eventId ? <FormFeedback>{formik.errors.eventId}</FormFeedback> : null}
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' htmlFor='name'>
                    Name
                  </Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    placeholder={eventProfile?.event.name}
                    className={classNames({ 'is-invalid': formik.touched.name && formik.errors.name })}
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? <FormFeedback>{formik.errors.name}</FormFeedback> : null}
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' htmlFor='venue'>
                    Venue
                  </Label>
                  <Input
                    type='textarea'
                    name='venue'
                    id='venue'
                    placeholder={eventProfile?.event.venue}
                    className={classNames({ 'is-invalid': formik.touched.venue && formik.errors.venue })}
                    {...formik.getFieldProps('venue')}
                  />
                  {formik.touched.venue && formik.errors.venue ? <FormFeedback>{formik.errors.venue}</FormFeedback> : null}
                </FormGroup>
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' htmlFor='organizedBy'>
                    Organized By (optional)
                  </Label>
                  <Input
                    type='text'
                    name='organizedBy'
                    id='organizedBy'
                    placeholder={eventProfile?.event.organizedBy}
                    className={classNames({ 'is-invalid': formik.touched.organizedBy && formik.errors.organizedBy })}
                    {...formik.getFieldProps('organizedBy')}
                  />
                  {formik.touched.organizedBy && formik.errors.organizedBy ? (
                    <FormFeedback>{formik.errors.organizedBy}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' htmlFor='startDate'>
                    Start Date (optional)
                  </Label>
                  <Input
                    type='date'
                    name='startDate'
                    id='startDate'
                    placeholder={eventProfile?.event?.startDate}
                    className={classNames({ 'is-invalid': formik.touched.startDate && formik.errors.startDate })}
                    {...formik.getFieldProps('startDate')}
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <FormFeedback>{formik.errors.startDate}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' htmlFor='endDate'>
                    End Date (optional)
                  </Label>
                  <Input
                    type='date'
                    name='endDate'
                    id='endDate'
                    placeholder={eventProfile?.event?.endDate}
                    className={classNames({ 'is-invalid': formik.touched.endDate && formik.errors.endDate })}
                    {...formik.getFieldProps('endDate')}
                  />
                  {formik.touched.endDate && formik.errors.endDate ? <FormFeedback>{formik.errors.endDate}</FormFeedback> : null}
                </FormGroup>
              </Col>

              <FormGroup>
                <Label className='form-label' htmlFor='questions'>
                  Questions
                </Label>
                <Input
                  type='textarea'
                  name='questions'
                  id='questions'
                  style={{ height: '150px' }}
                  placeholder={eventProfile?.event.questions.join('\n')}
                  className={classNames({ 'is-invalid': formik.touched.questions && formik.errors.questions })}
                  {...formik.getFieldProps('questions')}
                />
                {formik.touched.questions && formik.errors.questions ? (
                  <FormFeedback>{formik.errors.questions}</FormFeedback>
                ) : null}
              </FormGroup>
            </Row>
            {updateEventProfile?.success && <p className='text-success'>Event has been successfully updated!</p>}
            {error && (
              <p className='text-danger'>
                {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : errs.msg}
              </p>
            )}
            <Button.Ripple className='mr-1' color={currentSkin === 'light' ? 'primary' : 'secondary'} type='submit'>
              Update Event
            </Button.Ripple>
          </Form>
        </CardBody>
      ) : (
        <CardHeader>
          <CardTitle>No record Found!</CardTitle>
        </CardHeader>
      )}
    </Card>
  )
}

export default UpdateEvent
