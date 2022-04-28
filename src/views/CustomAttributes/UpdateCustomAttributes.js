import React, { useEffect } from 'react'
import * as Yup from 'yup'
import Spinner from '../common/Spinner'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import {
  handleFetchCustomAttributes,
  handleUpdateCustomAttributes,
  resetUpdateCustomAttributeState
} from '../../redux/actions/customAttributes/updateAttributesListAction'
import FormGroupField from '../components/FormGroupField'

function UpdateCustomAttributes() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const { currentSkin } = useSelector(state => state.skin)
  const { isLoading, updateAttributesInProcess, updateAttributesData, attributeDataById, error } = useSelector(
    state => state.updateCustomAttributes
  )

  useEffect(() => {
    dispatch(handleFetchCustomAttributes(id))
  }, [])

  const updateCustomAttributesSchema = Yup.object().shape({
    attributeId: Yup.string()
      .max(100, 'attributeId By must not exceed 100 characters')
      .required('attributeId By is a required field!'),
    parent: Yup.string().max(100, 'Parent By must not exceed 100 characters'),
    category: Yup.string()
      .required('category is a required field!')
      .matches(
        /^(customerType|businessType|tags|priority)$/,
        'type must be one of the following: customerType, businessType, tags or priority'
      ),
    type: Yup.string()
      .required('type is a required field!')
      .matches(/^(selectOption|checkbox)$/, 'type must be one of the following: selectOption, checkbox'),
    priority: Yup.number().positive().required('priority is a required field!').min(1, 'priority must be greater than 0')
  })

  const formik = useFormik({
    initialValues: {
      attributeId: attributeDataById?.customAttribute?._id || '',
      parent: attributeDataById?.customAttribute?.parent || '',
      category: attributeDataById?.customAttribute?.category || '',
      type: attributeDataById?.customAttribute?.type || '',
      priority: attributeDataById?.customAttribute?.priority || ''
    },
    validationSchema: updateCustomAttributesSchema,
    enableReinitialize: true,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          attributeId: values.attributeId,
          parent: values.parent,
          category: values.category,
          type: values.type,
          priority: values.priority
        }
        dispatch(handleUpdateCustomAttributes(id, data))
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetUpdateCustomAttributeState())
    }
  }, [])

  useEffect(() => {
    if (updateAttributesData?.success) {
      formik.resetForm()
      history.push('/list-custom-attributes')
    }
  }, [updateAttributesData?.success])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Update Attribute</CardTitle>
      </CardHeader>

      {updateAttributesInProcess || isLoading ? (
        <Spinner />
      ) : attributeDataById?.success ? (
        <CardBody>
          <Form onSubmit={formik.handleSubmit}>
            <Row>
              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupField
                  autoFocus
                  labelClassName='form-label'
                  label='Attribute ID'
                  inputType='text'
                  inputName='attributeId'
                  placeholder='Furniture Tech'
                  formikTouched={formik.touched.attributeId}
                  formikError={formik.errors.attributeId}
                  {...formik.getFieldProps('attributeId')}
                />
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupField
                  labelClassName='form-label'
                  label='Parent (for Tags only)'
                  inputType='text'
                  inputName='parent'
                  placeholder='e.g Valinge Flooring Products'
                  formikTouched={formik.touched.parent}
                  formikError={formik.errors.parent}
                  {...formik.getFieldProps('parent')}
                />
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupField
                  labelClassName='form-label'
                  label='Category'
                  inputType='select'
                  inputName='category'
                  formikTouched={formik.touched.category}
                  formikError={formik.errors.category}
                  {...formik.getFieldProps('category')}
                >
                  <option value=''>Select Category</option>
                  <option value='customerType'>Customer Type</option>
                  <option value='businessType'>Business Type</option>
                  <option value='tags'>Tags</option>
                  <option value='priority'>Priority</option>
                </FormGroupField>
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroupField
                  labelClassName='form-label'
                  label='Type'
                  inputType='text'
                  inputName='type'
                  placeholder={`selectOption, checkbox`}
                  formikTouched={formik.touched.type}
                  formikError={formik.errors.type}
                  {...formik.getFieldProps('type')}
                />
              </Col>

              <Col sm={12} md={3} className='mb-3 mb-md-0'>
                <FormGroupField
                  labelClassName='form-label'
                  label='Priority'
                  inputType='number'
                  min={1}
                  inputName='priority'
                  placeholder='insert a number'
                  formikTouched={formik.touched.priority}
                  formikError={formik.errors.priority}
                  {...formik.getFieldProps('priority')}
                />
              </Col>
            </Row>
            {updateAttributesData?.success && <p className='text-success'>{updateAttributesData?.msg}</p>}
            {error && (
              <p className='text-danger'>
                {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : error.msg}
              </p>
            )}
            <Button.Ripple className='mr-1' color={currentSkin === 'light' ? 'primary' : 'secondary'} type='submit'>
              Update Attribute
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

export default UpdateCustomAttributes
