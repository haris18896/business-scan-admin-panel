import React, { useEffect } from 'react'
import validator from 'validator'
import Spinner from '../common/Spinner'
import FormGroupField from '../components/FormGroupField'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { handleFetchRepresentative } from '../../redux/actions/representative/updateRrepresentative'

function UpdateRepresentative() {
  const dispatch = useDispatch()

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
    validationSchema: updateRepresentativeSchema
  })

  useEffect(() => {
    dispatch(handleFetchRepresentative(id))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>View Representative</CardTitle>
      </CardHeader>

      {isFetching ? (
        <Spinner />
      ) : (
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupField
                  label='Name'
                  disabled
                  labelClassName='form-label'
                  type='text'
                  inputName='name'
                  placeholder={representativeProfile?.name}
                  {...formik.getFieldProps('name')}
                  formikTouched={formik.touched.name}
                  formikError={formik.errors.name}
                />

                <FormGroupField
                  label='Email'
                  disabled
                  labelClassName='form-label'
                  type='email'
                  inputName='email'
                  placeholder={representativeProfile?.email}
                  {...formik.getFieldProps('email')}
                  formikTouched={formik.touched.email}
                  formikError={formik.errors.email}
                />
              </Col>
            </Row>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default UpdateRepresentative
