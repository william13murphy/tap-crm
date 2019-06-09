import React from 'react';
import './styles.less';

type PasswordRequirementsCalloutProps = {
  passwordValidation: any,
  resetPasswordform?: boolean,
};

const PasswordRequirementsCallout = (
  props: PasswordRequirementsCalloutProps
) => {
  const {
    isLowerCaseLetter,
    isSpecialCharacter,
    isMinimumCharacterLength,
  } = props.passwordValidation;

  return (
    <div
      className={`PasswordRequirementsCallout ${
        props.resetPasswordform ? 'resetPasswordForm' : ''
      } pt-callout`}
    >
      <span className="PasswordRequirementsCallout__icon pt-icon-standard pt-icon-warning-sign" />
      <strong>Your password must have the following:</strong>
      <ul>
        <li>
          <span
            className={`pt-icon-standard ${
              isLowerCaseLetter
                ? 'pt-icon-tick pt-intent-success'
                : 'pt-icon-cross pt-intent-danger'
            }`}
          />
          One lowercase letter.
        </li>
        <li>
          <span
            className={`pt-icon-standard ${
              isSpecialCharacter
                ? 'pt-icon-tick pt-intent-success'
                : 'pt-icon-cross pt-intent-danger'
            }`}
          />
          One special character.
        </li>
        <li>
          <span
            className={`pt-icon-standard ${
              isMinimumCharacterLength
                ? 'pt-icon-tick pt-intent-success'
                : 'pt-icon-cross pt-intent-danger'
            }`}
          />
          A minimum of 8 characters.
        </li>
      </ul>
    </div>
  );
};

export default PasswordRequirementsCallout;
