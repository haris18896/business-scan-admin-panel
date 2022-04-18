import classNames from 'classnames'
import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'

function FormGroupField({
  labelClassName,
  label,
  inputType,
  inputName,
  placeholder,
  formikTouched,
  formikError,
  defaultValue,
  style,
  formGroupClassName,
  formikTouchedClass,
  formikErrorClass,
  ...props
}) {
  return (
    <FormGroup className={formGroupClassName}>
      <Label className={labelClassName} htmlFor={inputName}>
        {label}
      </Label>
      <Input
        type={inputType}
        name={inputName || ''}
        style={style}
        id={inputName || ''}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={classNames({ 'is-invalid': `${formikTouched || formikTouchedClass || ''}` && `${formikError || formikErrorClass || ''}` })}
        {...props}
      />
      {`${formikTouched || ''}` && `${formikError || ''}` ? <FormFeedback>{formikError}</FormFeedback> : null}
    </FormGroup>
  )
}

export default FormGroupField
