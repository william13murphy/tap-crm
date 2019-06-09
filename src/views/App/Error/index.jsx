import React from 'react';
import Module from 'components/Layout/Module';
import { Route } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import './styles.less';

const Error = () => {
  return (
    <Module className="ErrorModule">
      <div className="ErrorModule__content">
        <Route path="/error/:statusCode" component={ErrorMessage} />
      </div>
    </Module>
  );
};

export default Error;
