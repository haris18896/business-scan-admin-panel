/* eslint-disable multiline-ternary */
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import moment from 'moment'
import validator from 'validator'
import Spinner from '../common/Spinner'
import FormGroupField from '../components/FormGroupField'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchEvent, handleUpdateEvent, resetUpdateEventState } from '../../redux/actions/event/updateEvent'

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
      startDate: eventProfile?.event?.startDate
        ? moment(eventProfile?.event?.startDate).format('YYYY-MM-DD')
        : eventProfile?.event?.startDate === null
        ? ''
        : '',
      endDate: eventProfile?.event?.endDate
        ? moment(eventProfile?.event?.endDate).format('YYYY-MM-DD')
        : eventProfile?.event?.endDate === null
        ? ''
        : ''
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
        <CardTitle>Update Event</CardTitle>
      </CardHeader>

      {/* loading here */}
      {isLoading || updateEventInProcess ? (
        <Spinner />
      ) : eventProfile?.success ? (
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupField
                  autoFocus={true}
                  label='Event id (optional)'
                  labelClassName='form-label'
                  type='text'
                  inputName='eventId'
                  placeholder='1234e56a'
                  {...formik.getFieldProps('eventId')}
                  formikTouched={formik.touched.eventId}
                  formikError={formik.errors.eventId}
                />

                <FormGroupField
                  label='Name'
                  labelClassName='form-label'
                  type='text'
                  inputName='name'
                  placeholder='Master Expo'
                  {...formik.getFieldProps('name')}
                  formikTouched={formik.touched.name}
                  formikError={formik.errors.name}
                />

                <FormGroupField
                  label='Venue'
                  labelClassName='form-label'
                  type='textarea'
                  inputName='venue'
                  placeholder='Down Street, London, UK'
                  {...formik.getFieldProps('venue')}
                  formikTouched={formik.touched.venue}
                  formikError={formik.errors.venue}
                />
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupField
                  label='Organized by (optional)'
                  labelClassName='form-label'
                  type='text'
                  inputName='organizedBy'
                  placeholder='Techoices'
                  {...formik.getFieldProps('organizedBy')}
                  formikTouched={formik.touched.organizedBy}
                  formikError={formik.errors.organizedBy}
                />

                <FormGroupField
                  label='Start date (optional)'
                  labelClassName='form-label'
                  type='date'
                  inputName='startDate'
                  placeholder='2022-03-11'
                  {...formik.getFieldProps('startDate')}
                  formikTouched={formik.touched.startDate}
                  formikError={formik.errors.startDate}
                />

                <FormGroupField
                  label='End date (optional)'
                  labelClassName='form-label'
                  type='date'
                  inputName='endDate'
                  placeholder='2022-03-11'
                  {...formik.getFieldProps('endDate')}
                  formikTouched={formik.touched.endDate}
                  formikError={formik.errors.endDate}
                />
              </Col>

              <FormGroupField
                label='Questions (note: one question per line)'
                labelClassName='form-label'
                type='textarea'
                style={{ height: '150px' }}
                inputName='questions'
                placeholder={`How long you have been part of company?\nHow many people are you working with?`}
                {...formik.getFieldProps('questions')}
                formikTouched={formik.touched.questions}
                formikError={formik.errors.questions}
              />
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
