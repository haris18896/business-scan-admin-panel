/* eslint-disable no-unused-vars */
/* eslint-disable multiline-ternary */
import React, { Fragment, useEffect, useLayoutEffect } from 'react'
import * as Yup from 'yup'
import classNames from 'classnames'
import ContactTable from './ContactTable'
import Spinner from '../../common/Spinner'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { handleFetchContact, handleUpdateContact, resetUpdateContactState } from '../../../redux/actions/contacts/updateContact'
import {
  handleFetchCustomAttributesList,
  resetCustomAttributesListState
} from '../../../redux/actions/customAttributes/fetchAttributesListAction'
import FormGroupField from '../../components/FormGroupField'

function UpdateContact() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()

  const { currentSkin } = useSelector(state => state.skin)
  const { isLoading, updateContactInProcess, updateContactProfile, fetchContactSuccess, contactProfile, error } = useSelector(
    state => state.updateContact
  )

  const { attributesListInProcess, attributesListData } = useSelector(state => state.listCustomAttributes)
  const extraAttr = Object.entries(contactProfile?.contact?.extraAttributes || {})

  useEffect(() => {
    dispatch(handleFetchContact(id))
  }, [])

  useLayoutEffect(() => {
    dispatch(handleFetchCustomAttributesList(1, 500, '', '', ''))
  }, [])

  const updateContactSchema = Yup.object().shape({
    name: Yup.object().shape({
      firstName: Yup.string()
        .required('First Name is a required field!')
        .min(2, 'FirstName must contain at least 2 characters')
        .max(30, 'FirstName must not exceed 30 characters'),
      middleName: Yup.string().max(30, 'Middle Name must not exceed 30 characters'),
      surName: Yup.string().min(2, 'surName must contain at least 2 characters').max(30, 'surName must not exceed 30 characters')
    }),
    event: Yup.object().shape({
      _id: Yup.string(),
      name: Yup.string(),
      organizedBy: Yup.string()
    }),
    job: Yup.string().max(40, 'job must not exceed 40 characters'),
    company: Yup.string().max(40, 'company must not exceed 40 characters'),
    website: Yup.string().max(40, 'website must not exceed 40 characters'),
    email: Yup.string().email('Please enter a valid email address').max(40, 'email must not exceed 60 characters'),
    phone: Yup.string().max(40, 'phone must not exceed 40 characters'),
    mobile: Yup.string().max(40, 'mobile must not exceed 40 characters'),
    fax: Yup.string().max(40, 'fax must not exceed 40 characters'),
    address: Yup.object(),
    type: Yup.string()
      .required('Type is a required field!')
      .matches(/^(businesscard|qrcode)$/, 'Type must be either businesscard or qrcode'),

    extraAttributes: Yup.object(),

    customerType: Yup.array().of(Yup.string()).nullable(),
    customAttributes: Yup.array()
      .of(
        Yup.object().shape({
          businessType: Yup.string(),
          tags: Yup.array().of(Yup.string().required('Tags is a required field')).nullable(),
          description: Yup.string().max(150, 'description must not exceed 150 characters'),
          priority: Yup.string().required('Priority is a required field!'),
          responsible: Yup.string().required('Responsible is a required field!')
        })
      )
      .nullable(),
    tags: Yup.array().of(Yup.string().max(40, 'tags must not exceed 40 characters')).nullable(),
    notes: Yup.string().max(150, 'notes must not exceed 150 characters'),
    questionnaire: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().max(150, 'question must not exceed 150 characters'),
        answer: Yup.string().max(150, 'Answer must not exceed 150 characters')
      })
    )
  })

  const formik = useFormik({
    initialValues: {
      name: {
        firstName: contactProfile?.contact?.name?.firstName || '',
        middleName: contactProfile?.contact?.name?.middleName || '',
        surName: contactProfile?.contact?.name?.surName || ''
      },
      event: {
        _id: contactProfile?.contact?.event?._id || '',
        name: contactProfile?.contact?.event?.name || '',
        organizedBy: contactProfile?.contact?.event?.organizedBy || ''
      },
      job: contactProfile?.contact?.job || '',
      company: contactProfile?.contact?.company || '',
      website: contactProfile?.contact?.website || '',
      email: contactProfile?.contact?.email || '',
      phone: contactProfile?.contact?.phone || '',
      mobile: contactProfile?.contact?.mobile || '',
      fax: contactProfile?.contact?.fax || '',
      address: {
        streetAddress: contactProfile?.contact?.address?.streetAddress || '',
        city: contactProfile?.contact?.address?.city || '',
        country: contactProfile?.contact?.address?.country || ''
      },
      type: contactProfile?.contact?.type || '',
      extraAttributes: contactProfile?.contact?.extraAttributes || '',
      customerType: contactProfile?.contact?.customerType || [],
      customAttributes: contactProfile?.contact?.customAttributes || [],
      tags: contactProfile?.contact?.tags ? contactProfile?.contact?.tags.join(',') : [],
      notes: contactProfile?.contact?.notes || '',
      questionnaire: contactProfile?.contact?.questionnaire || ''
    },
    enableReinitialize: true,
    validationSchema: updateContactSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: {
            firstName: values.name?.firstName,
            middleName: values.name?.middleName,
            surName: values.name?.surName
          },
          job: values.job,
          company: values.company,
          website: values.website,
          email: values.email,
          phone: values.phone,
          mobile: values.mobile,
          fax: values.fax,
          address: {
            streetAddress: values.address?.streetAddress,
            city: values.address?.city,
            country: values.address?.country
          },
          type: values.type,
          customerType: values.customerType,
          customAttributes: values.customAttributes,
          extraAttributes: values.extraAttributes,
          tags: values.tags.split(','),
          notes: values.notes,
          questionnaire: values.questionnaire
        }
        dispatch(handleUpdateContact(id, data))
      }
    }
  })

  useEffect(() => {
    if (updateContactProfile?.success) {
      formik.resetForm()
      history.push('/list-contacts')
    }
  }, [updateContactProfile?.success])

  useEffect(() => {
    return () => {
      dispatch(resetUpdateContactState())
      dispatch(resetCustomAttributesListState())
    }
  }, [])

  return (
    <Fragment>
      <ContactTable />

      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Update Contact</CardTitle>
        </CardHeader>

        {isLoading || updateContactInProcess || attributesListInProcess ? (
          <Spinner />
        ) : fetchContactSuccess ? (
          <CardBody>
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <CardTitle className={currentSkin === 'light' ? 'text-primary' : 'text-secondary'}>Basic Settings</CardTitle>
                <Col sm={12} md={8} lg={6} className='mb-1 mb-md-0'>
                  <FormGroupField
                    labelClassName='form-label'
                    label='First Name'
                    inputType='text'
                    inputName='name.firstName'
                    placeholder={contactProfile?.contact?.name?.firstName}
                    formikTouched={formik.touched.name?.firstName}
                    formikError={formik.errors.name?.firstName}
                    {...formik.getFieldProps('name.firstName')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Middle Name'
                    inputType='text'
                    inputName='name.middleName'
                    placeholder={contactProfile?.contact?.name?.middleName}
                    formikTouched={formik.touched.name?.middleName}
                    formikError={formik.errors.name?.middleName}
                    {...formik.getFieldProps('name.middleName')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Sur Name'
                    inputType='text'
                    inputName='name.surName'
                    placeholder={contactProfile?.contact?.name?.surName}
                    formikTouched={formik.touched.name?.surName}
                    formikError={formik.errors.name?.surName}
                    {...formik.getFieldProps('name.surName')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Job'
                    inputType='text'
                    inputName='job'
                    placeholder={contactProfile?.contact?.job}
                    formikTouched={formik.touched.job}
                    formikError={formik.errors.job}
                    {...formik.getFieldProps('job')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Company'
                    inputType='text'
                    inputName='company'
                    placeholder={contactProfile?.contact?.company}
                    formikTouched={formik.touched.company}
                    formikError={formik.errors.company}
                    {...formik.getFieldProps('company')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Website'
                    inputType='text'
                    inputName='website'
                    placeholder={contactProfile?.contact?.website}
                    formikTouched={formik.touched.website}
                    formikError={formik.errors.website}
                    {...formik.getFieldProps('website')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Email'
                    inputType='text'
                    inputName='email'
                    placeholder={contactProfile?.contact?.email}
                    formikTouched={formik.touched.email}
                    formikError={formik.errors.email}
                    {...formik.getFieldProps('email')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Phone'
                    inputType='text'
                    inputName='phone'
                    placeholder={contactProfile?.contact?.phone}
                    formikTouched={formik.touched.phone}
                    formikError={formik.errors.phone}
                    {...formik.getFieldProps('phone')}
                  />

                  <FormGroup className='d-flex justify-content-start flex-column'>
                    <Label for='customerType' className='mr-2 form-label'>
                      Event
                    </Label>
                    <Label style={{ fontSize: '14px' }}>{formik.values.event?.name}</Label>
                  </FormGroup>
                </Col>

                <Col sm={12} md={8} lg={6} className='mb-1 mb-md-0'>
                  <FormGroupField
                    labelClassName='form-label'
                    label='Mobile'
                    inputType='text'
                    inputName='mobile'
                    placeholder={contactProfile?.contact?.mobile}
                    formikTouched={formik.touched.mobile}
                    formikError={formik.errors.mobile}
                    {...formik.getFieldProps('mobile')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Fax'
                    inputType='text'
                    inputName='fax'
                    placeholder={contactProfile?.contact?.fax}
                    formikTouched={formik.touched.fax}
                    formikError={formik.errors.fax}
                    {...formik.getFieldProps('fax')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Street Address'
                    inputType='text'
                    inputName='address.streetAddress'
                    placeholder={contactProfile?.contact?.address.streetAddress}
                    formikTouched={formik.touched.address?.streetAddress}
                    formikError={formik.errors.address?.streetAddress}
                    {...formik.getFieldProps('address.streetAddress')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='City'
                    inputType='text'
                    inputName='address.city'
                    placeholder={contactProfile?.contact?.address?.city}
                    formikTouched={formik.touched.address?.city}
                    formikError={formik.errors.address?.city}
                    {...formik.getFieldProps('address.city')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Country'
                    inputType='text'
                    inputName='address.country'
                    placeholder={contactProfile?.contact?.address?.country}
                    formikTouched={formik.touched.address?.country}
                    formikError={formik.errors.address?.country}
                    {...formik.getFieldProps('address.country')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Type'
                    inputType='text'
                    inputName='type'
                    placeholder={contactProfile?.contact?.type}
                    formikTouched={formik.touched.type}
                    formikError={formik.errors.type}
                    {...formik.getFieldProps('type')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Tags'
                    inputType='text'
                    inputName='tags'
                    placeholder={contactProfile?.contact?.tags}
                    formikTouched={formik.touched.tags}
                    formikError={formik.errors.tags}
                    {...formik.getFieldProps('tags')}
                  />

                  <FormGroupField
                    labelClassName='form-label'
                    label='Notes'
                    inputType='text'
                    inputName='notes'
                    placeholder={contactProfile?.contact?.notes}
                    formikTouched={formik.touched.notes}
                    formikError={formik.errors.notes}
                    {...formik.getFieldProps('notes')}
                  />

                  <FormGroup className='d-flex justify-content-start flex-column'>
                    <Label for='customerType' className='mr-2 form-label'>
                      Representative
                    </Label>
                    {(contactProfile?.contact?.representative && (
                      <a target='__blank' href={`/view-representative/${contactProfile?.contact?.representative?._id}`}>
                        {contactProfile?.contact?.representative?.name}
                      </a>
                    )) ||
                      'N/A'}
                  </FormGroup>
                </Col>
              </Row>

              {extraAttr.length > 0 && (
                <>
                  <CardTitle className={currentSkin === 'light' ? 'text-primary' : 'text-secondary'}>Extra Attributes</CardTitle>
                  {extraAttr.map(([key, value], i) => {
                    return (
                      <Row key={i} className='mb-2'>
                        <Label className='form-label'>{`${key} : ${value}`}</Label>
                      </Row>
                    )
                  })}
                </>
              )}

              <CardTitle className={currentSkin === 'light' ? 'text-primary' : 'text-secondary'}>Custom Attributes</CardTitle>
              <div>
                <Label for='customerType' className='mr-2 form-label' style={{ marginRight: '15px' }}>
                  Customer Type
                </Label>
                <FormGroup className='d-flex justify-content-start'>
                  {attributesListData?.customAttributes
                    .filter(attribute => attribute.category.includes('customerType'))
                    .map((customerType, index) => (
                      <div key={index} className='custom-control custom-checkbox me-2'>
                        <Input
                          type='checkbox'
                          name={customerType._id}
                          id={customerType._id}
                          defaultChecked={
                            contactProfile?.contact?.customerType
                              ? contactProfile?.contact?.customerType.includes(customerType._id)
                              : formik.values?.customerType
                              ? formik.values?.customerType.includes(customerType._id)
                              : ''
                          }
                          value={customerType._id}
                          onChange={e => {
                            formik.setFieldValue(
                              'customerType',
                              e.target.checked
                                ? [...formik.values.customerType, customerType._id]
                                : formik.values.customerType.filter(item => item !== customerType._id)
                            )
                          }}
                          className={classNames({
                            'is-invalid': formik.touched.customerType && formik.errors.customerType?.[index]?.customerType
                          })}
                        />
                        <Label className='custom-control-label' style={{ marginLeft: '10px' }} htmlFor={customerType._id}>
                          {customerType._id}
                        </Label>
                      </div>
                    ))}
                </FormGroup>
              </div>

              <div>
                <Label for='customerType' className='mr-2 form-label' style={{ marginRight: '15px' }}>
                  Business Type
                </Label>
                <FormGroup className='d-flex justify-content-start'>
                  {attributesListData?.customAttributes
                    .filter(attribute => attribute?.category.includes('businessType'))
                    .map((businessType, index) => (
                      <div key={index} className='custom-control custom-checkbox me-2'>
                        <Input
                          type='checkbox'
                          name={businessType._id}
                          id={businessType._id}
                          defaultChecked={
                            contactProfile?.contact?.customAttributes
                              ? contactProfile?.contact?.customAttributes
                                  .map(item => item?.businessType)
                                  .includes(businessType._id)
                              : formik.values?.customAttributes
                              ? formik.values?.customAttributes.map(item => item?.businessType).includes(businessType._id)
                              : ''
                          }
                          value={businessType._id}
                          onChange={e => {
                            formik.setFieldValue(
                              'customAttributes',
                              e.target.checked
                                ? [
                                    ...formik.values?.customAttributes,
                                    { businessType: businessType._id, tags: [], description: '', priority: '', responsible: '' }
                                  ]
                                : formik.values?.customAttributes.filter(item => item.businessType !== businessType._id)
                            )
                          }}
                          className={classNames({
                            'is-invalid': formik.touched.customAttributes && formik.errors.customAttributes?.[index]?.businessType
                          })}
                        />
                        <Label className='custom-control-label' style={{ marginLeft: '10px' }} htmlFor={businessType._id}>
                          {businessType._id}
                        </Label>
                      </div>
                    ))}
                </FormGroup>
              </div>

              {formik.values?.customAttributes.map((item, index) => (
                <div key={index} className='d-flex justify-content-start flex-column p-1 border  rounded mt-2'>
                  <Label className='form-label' style={{ fontSize: '16px' }}>
                    Input about {item?.businessType}
                  </Label>
                  <Label for='customerType' className='mr-2 form-label' style={{ marginRight: '15px' }}>
                    Tags
                  </Label>
                  <FormGroup className='d-flex justify-content-start '>
                    {attributesListData?.customAttributes
                      .filter(attribute => attribute.category === 'tags' && attribute.parent === item?.businessType)
                      .map((tags, i) => (
                        <div key={i} className='custom-control custom-checkbox me-2 '>
                          <Input
                            type='checkbox'
                            name='tags'
                            id='tags'
                            defaultChecked={formik.values?.customAttributes[index]?.tags.includes(tags._id)}
                            value={tags._id}
                            onChange={e => {
                              formik.setFieldValue(
                                'customAttributes',
                                e.target.checked
                                  ? [
                                      ...formik.values?.customAttributes.map(tag => {
                                        if (tag?.businessType === item?.businessType) {
                                          return {
                                            ...tag,
                                            tags: [...tag.tags, tags._id]
                                          }
                                        }
                                        return tag
                                      })
                                    ]
                                  : formik.values?.customAttributes.map(tag => {
                                      if (tag?.businessType === item?.businessType) {
                                        return {
                                          ...tag,
                                          tags: tag.tags.filter(item => item !== tags._id)
                                        }
                                      }
                                      return tag
                                    })
                              )
                            }}
                            className={classNames({
                              'is-invalid':
                                formik.touched.customAttributes?.[index]?.tags && formik.errors.customAttributes?.[index]?.tags
                            })}
                          />
                          <Label className='custom-control-label' style={{ marginLeft: '10px' }} htmlFor={tags._id}>
                            {tags._id}
                          </Label>
                        </div>
                      ))}
                  </FormGroup>

                  <FormGroupField
                    labelClassName='custom-control-label'
                    label='Description'
                    style={{ maxWidth: '700px', height: '120px' }}
                    inputType='textarea'
                    inputName='description'
                    placeholder='Description'
                    formikTouchedClass={formik.touched.customAttributes?.[index]?.description}
                    formikErrorClass={formik.errors.customAttributes?.[index]?.description}
                    {...formik.getFieldProps(`customAttributes.${index}.description`)}
                  />

                  <FormGroup className='d-flex justify-content-start align-items-center mt-2'>
                    <Label for='priority' className='form-label' style={{ marginRight: '15px' }}>
                      Priority:
                    </Label>
                    <Input
                      type='select'
                      name='priority'
                      id='priority'
                      style={{ maxWidth: '200px' }}
                      {...formik.getFieldProps(`customAttributes.${index}.priority`)}
                      className={classNames({
                        'is-invalid':
                          formik.touched.customAttributes?.[index]?.priority && formik.errors.customAttributes?.[index]?.priority
                      })}
                    >
                      <option value=''>Select Priority</option>
                      {attributesListInProcess ? (
                        <option value=''>Loading...</option>
                      ) : (
                        attributesListData?.customAttributes
                          .filter(attribute => attribute.category.includes('priority'))
                          .map((priority, index) => {
                            return (
                              <option key={index} value={priority._id}>
                                {priority._id}
                              </option>
                            )
                          })
                      )}
                    </Input>
                  </FormGroup>

                  <FormGroupField
                    formGroupClassName='d-flex justify-content-start align-items-center'
                    labelClassName='form-label'
                    style={{ maxWidth: '100px', marginLeft: '15px' }}
                    label='Responsible'
                    inputType='text'
                    inputName={`questionnaire.${index}.question`}
                    placeholder='Chk'
                    formikTouchedClass={formik.touched.customAttributes?.[index]?.responsible}
                    formikErrorClass={formik.errors.customAttributes?.[index]?.responsible}
                    {...formik.getFieldProps(`customAttributes.${index}.responsible`)}
                  />
                </div>
              ))}

              <CardTitle className={currentSkin === 'light' ? 'mt-2 text-primary' : 'mt-2 text-secondary'}>
                Questionnaire
              </CardTitle>
              {contactProfile?.contact?.questionnaire.map((question, index) => (
                <Row key={index} className='align-items-center'>
                  <Col sm={6} className='mb-1 mb-md-0'>
                    <FormGroupField
                      labelClassName='form-label'
                      label='Question'
                      inputType='text'
                      inputName={`questionnaire.${index}.question`}
                      placeholder={question?.question}
                      formikTouched={formik.touched.questionnaire?.[index]?.question}
                      formikError={formik.errors.questionnaire?.[index]?.question}
                      {...formik.getFieldProps(`questionnaire.${index}.question`)}
                    />
                  </Col>
                  <Col sm={6} className='mb-1 mb-md-0'>
                    <FormGroupField
                      labelClassName='form-label'
                      label='Answer'
                      inputType='text'
                      inputName={`questionnaire.${index}.answer`}
                      placeholder={question?.answer}
                      formikTouched={formik.touched.questionnaire?.[index]?.answer}
                      formikError={formik.errors.questionnaire?.[index]?.answer}
                      {...formik.getFieldProps(`questionnaire.${index}.answer`)}
                    />
                  </Col>
                </Row>
              ))}

              {updateContactProfile?.success && <p className='text-success'>Event has been successfully updated!</p>}
              {error && (
                <p className='text-danger'>
                  {error.errors && error.errors.length ? `${error.errors[0].param} ${error.errors[0].msg}` : errs.msg}
                </p>
              )}
              <Button.Ripple className='mr-1' color={currentSkin === 'light' ? 'primary' : 'secondary'} type='submit'>
                Update Contact
              </Button.Ripple>
            </Form>
          </CardBody>
        ) : (
          <CardHeader>
            <CardTitle>No record Found!</CardTitle>
          </CardHeader>
        )}
      </Card>
    </Fragment>
  )
}

export default UpdateContact
