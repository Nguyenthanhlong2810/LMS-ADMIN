import PropTypes from 'prop-types';
import './InputUpload.scss';
import { InputUploadMultiple } from './InputUploadMultiple';
import { InputUploadSingle } from './InputUploadSingle';
import React from 'react';

InputUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  accept: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  /** calculate by MB */
  maxSize: PropTypes.number,
  multiple: PropTypes.bool,
  acceptText: PropTypes.array
};

export function InputUpload({ multiple, ...props }) {
  return multiple ? <InputUploadMultiple {...props} /> : <InputUploadSingle {...props} />;
}
