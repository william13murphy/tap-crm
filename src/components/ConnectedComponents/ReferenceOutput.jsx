import React from 'react';
import connect from 'src/redux/connect';
import { getReferenceItemById } from 'src/api/referenceItems';

type ReferenceOutputProps = {
  listName: string, // Reference list name, as in: 'LstCountries'
  id: string, // Reference item id
  references: Array<{}>, // From redux
  field?: string, // Optional: Use this if you want to output a field other than 'Description'
};

const ReferenceOutput = (props: ReferenceOutputProps) => {
  const reference = getReferenceItemById(
    props.references,
    props.listName,
    props.id
  );
  const referenceExists = reference ? true : false;
  if (referenceExists) {
    return <span>{reference[props.field || 'Description']}</span>;
  } else {
    return (
      <span className="pt-callout pt-intent-warning pt-icon-warning-sign">
        <em>Missing Reference Data</em>
      </span>
    );
  }
};

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(
  ReferenceOutput,
  mapStateToProps
);
