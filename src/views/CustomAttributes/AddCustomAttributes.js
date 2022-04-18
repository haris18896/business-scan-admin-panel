import React, { useEffect } from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import Spinner from '../common/Spinner'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleAddCustomAttributes, resetAddCustomAttributes } from '../../redux/actions/customAttributes/addAttributesListAction'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'

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
      .matches(/^(selectOption|checkbox)$/, 'type must be one of the following: selectOption, checkbox')
  })

  const formik = useFormik({
    initialValues: {
      attributeId: '',
      parent: '',
      category: '',
      type: ''
    },
    validationSchema: addCustomAttributesSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          attributeId: values.attributeId,
          parent: values.parent,
          category: values.category,
          type: values.type
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
                <FormGroup>
                  <Label className='form-label' htmlFor='attributeId'>
                    Attribute ID
                  </Label>
                  <Input
                    autoFocus
                    type='text'
                    name='attributeId'
                    id='attributeId'
                    placeholder='Furniture Tech'
                    className={classNames({ 'is-invalid': formik.touched.attributeId && formik.errors.attributeId })}
                    {...formik.getFieldProps('attributeId')}
                  />
                  {formik.touched.attributeId && formik.errors.attributeId ? (
                    <FormFeedback>{formik.errors.attributeId}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' htmlFor='parent'>
                    Parent (for Tags only)
                  </Label>
                  <Input
                    type='text'
                    name='parent'
                    id='parent'
                    placeholder='e.g Valinge Flooring Products'

                    className={classNames({ 'is-invalid': formik.touched.parent && formik.errors.parent })}
                    {...formik.getFieldProps('parent')}
                  />
                  {formik.touched.parent && formik.errors.parent ? <FormFeedback>{formik.errors.parent}</FormFeedback> : null}
                </FormGroup>
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' htmlFor='parent'>
                    Category
                  </Label>
                  <Input
                    type='select'
                    name='category'
                    id='category'
                    className={classNames({ 'is-invalid': formik.touched.category && formik.errors.category })}
                    {...formik.getFieldProps('category')}
                  >
                    <option value=''>Select Category</option>
                    <option value='customerType'>Customer Type</option>
                    <option value='businessType'>Business Type</option>
                    <option value='tags'>Tags</option>
                    <option value='priority'>Priority</option>
                  </Input>
                  {formik.touched.category && formik.errors.category ? (
                    <FormFeedback>{formik.errors.category}</FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>

              <Col sm={12} md={8} lg={6} className='mb-3 mb-md-0'>
                <FormGroup>
                  <Label className='form-label' htmlFor='type'>
                    Type
                  </Label>
                  <Input
                    type='text'
                    name='type'
                    id='type'
                    placeholder={`selectOption, checkbox`}
                    className={classNames({ 'is-invalid': formik.touched.type && formik.errors.type })}
                    {...formik.getFieldProps('type')}
                  />
                  {formik.touched.type && formik.errors.type ? <FormFeedback>{formik.errors.type}</FormFeedback> : null}
                </FormGroup>
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
