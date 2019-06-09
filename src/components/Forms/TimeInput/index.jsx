import React from 'react';
import moment from 'moment';
import TimePicker from 'rc-time-picker';

import InputFlags from 'components/Forms/InputFlags';

import 'rc-time-picker/assets/index.css';
import './styles.less';

const format = 'h:mm a';

const midnight = moment()
  .hour(0)
  .minute(0);

type TimeInputProps = {
  onChange: Function,
  value: string,
  input: Object,
  disabled: boolean,
};

const TimeInput = (props: TimeInputProps) => {
  return (
    <div
      className={`TimeInput ${props.meta.touched && 'touched'} ${props.meta
        .error && 'error'}`}
      onClick={e => e.preventDefault()}
    >
      <TimePicker
        showSecond={false}
        value={props.input.value ? moment(props.input.value) : null}
        className="TimeInput__TimePicker"
        onChange={e => {
          if (e) {
            props.input.onChange(e._d);
          } else {
            props.input.onChange('');
          }
        }}
        format={format}
        use12Hours
        minuteStep={5}
        inputReadOnly
        disabled={props.disabled}
      />
      <InputFlags meta={props.meta} />
    </div>
  );
};

export default TimeInput;
