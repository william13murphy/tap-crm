import React from 'react';
import './styles.less';

const CanceledPlanCallout = ({ canceled }) => {
  return (
    <div
      className={`CanceledPlanCallout ${
        canceled ? 'canceled' : 'not-canceled'
      }`}
    >
      <div className="pt-callout pt-intent-danger">
        <h2>This plan has been canceled and is read-only.</h2>
      </div>
    </div>
  );
};

export default CanceledPlanCallout;
