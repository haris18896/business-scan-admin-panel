/* eslint-disable */
import React, { useEffect } from 'react'
import '@styles/base/pages/authentication.scss'

import * as Yup from 'yup'
import validator from 'validator'
import Spinner from '../../common/Spinner'
import themeConfig from '@configs/themeConfig'

import { useFormik } from 'formik'
import { isObjEmpty } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardBody, CardTitle, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import { handleFetchProfile, handleUpdateProfile, resetState } from '../../../redux/actions/admin/profile'
import FormGroupField from '../../components/FormGroupField'

function UpdateProfile() {
  const skin = useSkin()
  const dispatch = useDispatch()
  const history = useHistory()

  const { isFetching, error, success, profile } = useSelector(state => state.profileUpdate)

  const updateProfileSchema = Yup.object().shape({
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
      name: profile && profile['name'],
      email: profile && profile['email']
    },
    enableReinitialize: true,
    validationSchema: updateProfileSchema,
    onSubmit: values => {
      if (isObjEmpty(formik.errors)) {
        const data = {
          name: values.name,
          email: values.email.trim()
        }
        dispatch(handleUpdateProfile(data))
      }
    }
  })

  useEffect(() => {
    dispatch(handleFetchProfile())
  }, [dispatch])

  useEffect(() => {
    if (profile) {
      const { name, email } = profile
      formik.resetForm(name, email)
    }
  }, [profile])

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [])

  useEffect(() => {
    if (success) {
      formik.resetForm()
      history.push('/')
    }
  }, [success])

  return isFetching ? (
    <Spinner />
  ) : (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner py-2'>
        <Card className='auth-inner mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              {skin === 'dark' ? (
                <img src={themeConfig.app.appLogoImageLight} alt='logo-dark' height='30px' />
              ) : (
                <img src={themeConfig.app.appLogoImageDark} alt='logo-dark' height='30px' />
              )}
            </Link>
            <CardTitle tag='h4' className='mb-2 text-center'>
              Update Your Profile
            </CardTitle>
            <Form className='auth-login-form mt-2' onSubmit={formik.handleSubmit}>
              <FormGroupField
                autoFocus={true}
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
                labelClassName='form-label'
                autoFocus
                label='Email'
                type='email'
                inputName='email'
                placeholder='youremail@example.com'
                formikTouched={formik.touched.email}
                formikError={formik.errors.email}
                {...formik.getFieldProps('email')}
              />

              {success && <p className='text-success'>Profile has been successfully updated!</p>}
              {error && <p className='text-danger'>{error.errors?.length ? error.errors[0].msg : error.msg}</p>}

              <Button.Ripple type='submit' color='primary' block>
                Update Profile
              </Button.Ripple>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default UpdateProfile
