import React, { useEffect } from 'react'

import * as Yup from 'yup'
import validator from 'validator'
import classNames from 'classnames'
import Spinner from '../common/Spinner'
import InputPasswordToggle from '@components/input-password-toggle'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, Form, Row, Col, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import { handleRegisterRepresentative, resetState } from '../../redux/actions/representative/register'

function registerRepresentative() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { currentSkin } = useSelector(state => state.skin)
  const { isLoading, registerRepresentative, error } = useSelector(state => state.registerRepresentative)

  const registerAdminSchema = Yup.object().shape({
    id: Yup.string()
      .min(3, 'id must be at least 3 characters long')
      .test('id', 'id must not contain special characters', value => {
        if (!value) return true
        return validator.isAlphanumeric(value, 'en-US', { ignore: '-' })
      }),
    name: Yup.string()
      .required('Name is a required field!')
      .min(3, 'Name must contain at least 3 characters')
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
      id: '',
      name: '',
      email: ''
    },
    validationSchema: registerAdminSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const { id, name, email } = values
        const data = {
          id,
          name,
          email: email.trim()
        }
        dispatch(handleRegisterRepresentative(data))
      }
    }
  })

  useEffect(() => {
    if (registerRepresentative?.success) {
      formik.resetForm()
      history.push('/list-representative')
    }
  }, [registerRepresentative?.success])

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Representative</CardTitle>
      </CardHeader>

      {isLoading ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form method='POST' onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' htmlFor='id'>
                    ID (optional)
                  </Label>
                  <Input
                    autoFocus
                    type='text'
                    name='id'
                    id='id'
                    placeholder='123'
                    className={classNames({ 'is-invalid': formik.touched.id && formik.errors.id })}
                    {...formik.getFieldProps('id')}
                  />
                  {formik.touched.id && formik.errors.id ? <FormFeedback>{formik.errors.id}</FormFeedback> : null}
                </FormGroup>

                <FormGroup>
                  <Label className='form-label' htmlFor='name'>
                    Name
                  </Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Abdullah'
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
                    placeholder='abdullah@example.com'
                    className={classNames({ 'is-invalid': formik.touched.email && formik.errors.email })}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? <FormFeedback>{formik.errors.email}</FormFeedback> : null}
                </FormGroup>

                {registerRepresentative && <p className='text-success'>{registerRepresentative?.msg}</p>}
                {error && (
                  <p className='text-danger'>
                    {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : errs.msg}
                  </p>
                )}

                <Button.Ripple className='mr-1' color={currentSkin === 'light' ? 'primary' : 'secondary'} type='submit'>
                  Add
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default registerRepresentative
