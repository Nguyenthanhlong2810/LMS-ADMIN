import React from 'react';

import './styles.scss';
import PropTypes from 'prop-types';

export const CourseStatus = ({ status, statusLabels }) => {
  return (
    <div className="custom-row-status">
      <span className={status}>{statusLabels[status]}</span>
    </div>
  );
};
CourseStatus.propTypes = {
  status: PropTypes.string.isRequired,
  statusLabels: PropTypes.shape({
    apply: PropTypes.string,
    notApply: PropTypes.string
  }).isRequired
};
