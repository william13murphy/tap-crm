import React from 'react';
import { statusMessages } from './statusMessages';
import LogOutButtonWrapper from 'components/Auth/LogOutButtonWrapper';

type ErrorMessageProps = {
  match: {
    params: {
      statusCode: string,
    },
  },
};

const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div className="ErrorMessage">
      <h3>An error has occurred.</h3>
      <div>Error {props.match.params.statusCode}</div>
      <div>{statusMessages[props.match.params.statusCode]}</div>
      {props.match.params.statusCode === '401' && (
        <div>
          <LogOutButtonWrapper>
            <button className="pt-button">Log Out</button>
          </LogOutButtonWrapper>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
