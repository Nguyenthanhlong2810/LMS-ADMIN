import React from 'react';

import './styles.scss';
import PropTypes from 'prop-types';

const Status = {
  APPLY: 'Áp dụng',
  NOT_APPLY: 'Không áp dụng'
};
export const StatusFAQ = ({ status = 'APPLY' }) => {
  return (
    <div className="custom-row-status">
      <span className={status}> {Status[status]} </span>
    </div>
  );
};
StatusFAQ.propTypes = {
  status: PropTypes.string
};
