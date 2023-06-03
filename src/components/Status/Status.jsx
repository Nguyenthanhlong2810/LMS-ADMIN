import React from 'react';

import './styles.scss';
import PropTypes from 'prop-types';

export const Status = ({ status, statusLabels }) => {
  return (
    <div className="custom-row-status">
      <span className={status ? 'APPLY' : ''}>
        {status ? statusLabels.apply : statusLabels.notApply}
      </span>
    </div>
  );
};
Status.propTypes = {
  status: PropTypes.bool.isRequired,
  statusLabels: PropTypes.shape({
    apply: PropTypes.string,
    notApply: PropTypes.string
  }).isRequired
};
