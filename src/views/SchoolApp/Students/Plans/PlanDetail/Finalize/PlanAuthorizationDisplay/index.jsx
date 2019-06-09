import React from 'react';

type PlanSummaryDisplayProps = {
  agreementBlobUrl: any,
};

const PlanAuthorizationDisplay = props => {
  const agreementImage = props.agreementBlobUrl;

  return <div>{agreementImage && <img src={agreementImage} />}</div>;
};

export default PlanAuthorizationDisplay;
