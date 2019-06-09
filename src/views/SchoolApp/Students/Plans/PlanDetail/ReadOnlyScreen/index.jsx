import React from 'react';
import './styles.less';

const ReadOnlyScreen = ({ readOnly, children }) => {
  return (
    <div
      className={`ReadOnlyScreen ${readOnly ? 'readOnly' : 'not-readOnly'}`}
    />
  );
};

export default ReadOnlyScreen;
