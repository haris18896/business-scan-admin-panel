import React, { useEffect } from 'react'
import validator from 'validator'
import classNames from 'classnames'
import Spinner from '../common/Spinner'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  handleFetchRepresentative,
  handleUpdateRepresentative,
  resetUpdateRepresentativeState
} from '../../redux/actions/representative/updateRrepresentative'

function UpdateRepresentative() {
  const dispatch = useDispatch()
  const history = useHistory()
  
  const { currentSkin } = useSelector(state => state.skin)
  const { updateRepresentativeInProcess, updateRepresentativeProfile, error } = useSelector(state => state.updateRepresentative)
  const { isFetching, representativeProfile } = useSelector(state => state.getRepresentative)

  const { id } = useParams()

  const updateRepresentativeSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is a required field!')
      .min(4, 'Name must contain at least 4 characters')
      .test('name', 'Name must not contain numbers or special characters', value => {
        if (!value) {
          return true
        }
        return validator.isAlpha(value, 'en-US', { ignore: ' -' })
      }),
    email: Yup.string().email('Please enter a valid email address').required('Email is a required field!')
  })

  const formik = useFormik({
    initialValues: {
      name: representativeProfile?.name || '',
      email: representativeProfile?.email || ''
    },
    enableReinitialize: true,
    validationSchema: updateRepresentativeSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const { name, email } = values
        const data = {
          name,
          email: email.trim()
        }
        dispatch(handleUpdateRepresentative(id, data))
      }
    }
  })

  useEffect(() => {
    dispatch(handleFetchRepresentative(id))
  }, [])

  useEffect(() => {
    if (updateRepresentativeProfile?.success) {
      formik.resetForm()
      history.push('/list-representative')
    }
  }, [updateRepresentativeProfile?.success])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateRepresentativeState())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Representative</CardTitle>
      </CardHeader>

      {isFetching || updateRepresentativeInProcess ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' htmlFor='name'>
                    Name
                  </Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    placeholder={representativeProfile?.name}
                    className={classNames({ 'is-invalid': formik.touched.name && formik.errors.name })}
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? <FormFeedback>{formik.errors.name}</FormFeedback> : null}
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' htmlFor='email'>
                    Email
                  </Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder={representativeProfile?.email}
                    className={classNames({ 'is-invalid': formik.touched.email && formik.errors.email })}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? <FormFeedback>{formik.errors.email}</FormFeedback> : null}
                </FormGroup>

                {updateRepresentativeProfile?.success && (
                  <p className='text-success'>Representative has been successfully updated!</p>
                )}
                {error && (
                  <p className='text-danger'>
                    {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : errs.msg}
                  </p>
                )}

                <Button.Ripple className='mr-1' color={currentSkin === 'light' ? 'primary' : 'secondary'} type='submit'>
                  Update representative
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default UpdateRepresentative
