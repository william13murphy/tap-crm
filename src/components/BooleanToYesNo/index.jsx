import React from 'react';

type BooleanToYesNoProps = {
  bool: boolean, // Boolean to decide yes or no
  color: boolean, // Show red/green colors for Yes/No
  yes: string, // Alternate "Yes" text
  no: string, // Alternate "No" text
};

const BooleanToYesNo = ({ bool, color, yes, no }) => {
  if (bool) {
    return (
      <span
        className={`BooleanToYesNo BooleanToYesNo--yes ${
          color ? 'color-intent-success' : ''
        }`}
      >
        {yes || 'Yes'}
      </span>
    );
  } else {
    return (
      <span
        className={`BooleanToYesNo BooleanToYesNo--no ${
          color ? 'color-intent-danger' : ''
        }`}
      >
        {no || 'No'}
      </span>
    );
  }
};

export default BooleanToYesNo;
