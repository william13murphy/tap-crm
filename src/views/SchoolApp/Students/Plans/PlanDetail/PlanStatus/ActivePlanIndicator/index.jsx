import React from 'react';
import './styles.less';

const ActivePlanIndicator = ({ planDetail }) => {
  if (planDetail.payload.TerminiationDate) {
    return null;
  } else {
    if (planDetail.payload.Finalized) {
      return (
        <span className="ActivePlanIndicator plan-active pt-callout pt-intent-success">
          <span className="ActivePlanIndicator__icon">
            <i className="fa fa-check-circle" />
          </span>
          <span className="ActivePlanIndicator__text">Active</span>
        </span>
      );
    } else {
      return (
        <span className="ActivePlanIndicator plan-incomplete pt-callout pt-intent-warning">
          <span className="ActivePlanIndicator__icon">
            <i className="fa fa-exclamation-triangle" />
          </span>
          <span className="ActivePlanIndicator__text">Incomplete</span>
        </span>
      );
    }
  }
};

export default ActivePlanIndicator;
