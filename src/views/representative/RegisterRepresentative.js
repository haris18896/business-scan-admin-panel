import React, { useEffect } from 'react'

import * as Yup from 'yup'
import validator from 'validator'
import Spinner from '../common/Spinner'
import FormGroupField from '../components/FormGroupField'

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
                <FormGroupField
                  autoFocus={true}
                  label='Id (optional)'
                  labelClassName='form-label'
                  type='text'
                  inputName='id'
                  placeholder='123'
                  {...formik.getFieldProps('id')}
                  formikTouched={formik.touched.id}
                  formikError={formik.errors.id}
                />

                <FormGroupField
                  label='Name'
                  labelClassName='form-label'
                  type='text'
                  inputName='name'
                  placeholder='Enter your name'
                  {...formik.getFieldProps('name')}
                  formikTouched={formik.touched.name}
                  formikError={formik.errors.name}
                />

                <FormGroupField
                  label='Email'
                  labelClassName='form-label'
                  type='email'
                  inputName='email'
                  placeholder='youremail@example.com'
                  {...formik.getFieldProps('email')}
                  formikTouched={formik.touched.email}
                  formikError={formik.errors.email}
                />

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
