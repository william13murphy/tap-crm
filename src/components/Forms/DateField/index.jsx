import React from 'react';
import { Field } from 'redux-form';
import { DateInput } from '@blueprintjs/datetime'; // implements "react-day-picker"
import { Position } from '@blueprintjs/core';
import './styles.less';
import ContextHelp from 'components/ContextHelp';
import InputFlags from 'components/Forms/InputFlags';
import moment from 'moment';

type DateFieldProps = {
  label: string, // display label
  name: string, // input name
  required?: boolean,
  placeholder?: string,
  id?: string,
  help?: boolean,
  dob?: boolean, // Birth Date
  past?: boolean, // Date in the past
  future?: boolean, // Date in the future
  position?: number,
  disabled?: boolean,
};

// Values required by redux-form for DateInput
type DateInputProps = {
  input: {
    value: string,
    onChange: any,
  },
};

const getPosition = (position: 'top' | 'bottom' | 'left' | 'right') => {
  // There are also options for top left, bottom right, etc if needed.
  if (position) {
    if (position === 'top') {
      return Position.TOP;
    } else if (position === 'bottom') {
      return Position.BOTTOM;
    } else if (position === 'left') {
      return Position.LEFT;
    } else if (position === 'right') {
      return Position.RIGHT;
    }
  } else {
    return Position.TOP;
  }
};

const DateField = (props: DateFieldProps) => {
  // Default min/max date:
  let minDate = moment()
    .subtract(10, 'years')
    .toDate();

  let maxDate = moment()
    .add(10, 'years')
    .toDate();

  if (props.dob) {
    minDate = moment()
      .subtract(150, 'years')
      .toDate();
    maxDate = moment().toDate();
  }

  if (props.past) {
    minDate = moment()
      .subtract(10, 'years')
      .toDate();
    maxDate = moment().toDate();
  }

  if (props.future) {
    minDate = moment().toDate();
    maxDate = moment()
      .add(10, 'years')
      .toDate();
  }

  return (
    <div className="DateField input-container date-input-container">
      <label className="pt-label">
        <div className="FieldGroup">
          {props.label}
          {props.help && <ContextHelp id={props.id} />}
        </div>
      </label>
      <div className="pt-input-group">
        <span className="pt-icon pt-icon-calendar" />
        <Field
          required={props.required || false}
          component={(componentProps: DateInputProps) => {
            return (
              <span
                className={`DateInput__container ${componentProps.meta
                  .touched && 'touched'} ${componentProps.meta.error &&
                  'error'}`}
              >
                <DateInput
                  popoverProps={{
                    position: getPosition(props.position),
                  }}
                  value={
                    componentProps.input.value &&
                    componentProps.input.value !== '9999-12-31T00:00:00' //Default time when datefield is blank
                      ? new Date(componentProps.input.value)
                      : null
                  }
                  onChange={param => componentProps.input.onChange(param)}
                  formatDate={date => date.toLocaleDateString()}
                  parseDate={str => new Date(str)}
                  format="MM/DD/YYYY"
                  minDate={minDate}
                  maxDate={maxDate}
                  disabled={props.disabled}
                />
                <InputFlags meta={componentProps.meta} />
              </span>
            );
          }}
          name={props.name}
          type="text"
          placeholder={props.placeholder || ''}
        />
      </div>
    </div>
  );
};

export default DateField;
