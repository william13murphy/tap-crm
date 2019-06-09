import React from 'react';
import moment from 'moment';
import ActivePlanIndicator from './ActivePlanIndicator';
import { Link } from 'react-router-dom';
import './styles.less';

const PlanStatus = props => (
  <div className="PlanStatus">
    <ActivePlanIndicator planDetail={props.planDetail} />
    {props.planDetail.payload.TerminiationDate ? (
      <div className="CancelledPlanMessage pt-callout pt-intent-danger">
        <strong>Canceled:</strong>{' '}
        {moment(props.planDetail.payload.TerminiationDate).format(
          'MMMM D, YYYY'
        )}
      </div>
    ) : (
      <Link className="CancelPlanLink" to={`${props.match.url}/cancel-plan`}>
        <button className="pt-button pt-intent-danger">
          <i className={'CancelPlanLink__icon fa fa-ban'} aria-hidden="true" />
          <span className="CancelPlanLink__text">Cancel Plan</span>
        </button>
      </Link>
    )}
  </div>
);

export default PlanStatus;
