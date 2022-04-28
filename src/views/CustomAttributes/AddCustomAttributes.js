import React, { useEffect } from 'react'
import * as Yup from 'yup'
import Spinner from '../common/Spinner'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddCustomAttributes, resetAddCustomAttributes } from '../../redux/actions/customAttributes/addAttributesListAction'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import FormGroupField from '../components/FormGroupField'

function AddCustomAttributes() {
  const dispatch = useDispatch()
  const history = useHistory()

  const { currentSkin } = useSelector(state => state.skin)
  const { attributesInProcess, attributesData, error } = useSelector(state => state.addCustomAttributes)

  const addCustomAttributesSchema = Yup.object().shape({
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
      attributeId: '',
      parent: '',
      category: '',
      type: '',
      priority: ''
    },
    validationSchema: addCustomAttributesSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          attributeId: values.attributeId,
          parent: values.parent,
          category: values.category,
          type: values.type,
          priority: values.priority
        }
        dispatch(handleAddCustomAttributes(data))
      }
    }
  })

  useEffect(() => {
    return () => {
      dispatch(resetAddCustomAttributes())
    }
  }, [])

  useEffect(() => {
    if (attributesData?.success) {
      history.push('/list-custom-attributes')
    }
  }, [attributesData?.success])

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Attribute</CardTitle>
      </CardHeader>

      {attributesInProcess ? (
        <Spinner />
      ) : (
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
            {attributesData?.success && <p className='text-success'>{attributesData?.msg}</p>}
            {error && (
              <p className='text-danger'>
                {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : errs.msg}
              </p>
            )}
            <Button.Ripple className='mr-1' color={currentSkin === 'light' ? 'primary' : 'secondary'} type='submit'>
              Add Attribute
            </Button.Ripple>
          </Form>
        </CardBody>
      )}
    </Card>
  )
}

export default AddCustomAttributes
