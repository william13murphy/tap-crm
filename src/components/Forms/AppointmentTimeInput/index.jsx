import React from 'react';
import moment from 'moment';
// import TimePicker from 'react-time-picker';
//import TextField from '@material-ui/core/TextField';

import InputFlags from 'components/Forms/InputFlags';

// import 'rc-time-picker/assets/index.css';
// import './styles.less';

const format = 'h:mm a';

const midnight = moment()
  .hour(0)
  .minute(0);

type AppointmentTimeInputProps = {
  onChange: Function,
  value: string,
  input: Object,
  disabled: boolean,
};

const AppointmentTimeInput = (props: AppointmentTimeInputProps) => {
  return (
    <div
      className={`AppointmentTimeInput ${props.meta.touched &&
        'touched'} ${props.meta.error && 'error'}`}
      onClick={e => e.preventDefault()}
    >
      <TextField
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue={props.input.value}
        // value={props.input.value}
        onChange={e => {
          if (e) {
            props.input.onChange(e._d);
          } else {
            props.input.onChange('');
          }
        }}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
      <InputFlags meta={props.meta} />
    </div>
  );
};

export default AppointmentTimeInput;
