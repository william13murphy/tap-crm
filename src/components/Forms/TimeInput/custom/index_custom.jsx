import React from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './styles.less';
import moment from 'moment';

const BetterSelect = props => {
  return (
    <Select
      className={`BetterSelect`}
      options={props.options}
      {...props.input}
      placeholder={props.placeholder || 'Select a choice'}
    />
  );
};

const hourOptions = () => {
  const hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push({ label: i, value: i });
  }
  return hours;
};

const minuteOptions = () => {
  const minutes = [];
  for (let i = 0; i < 60; i += 5) {
    let iLabel = i === 0 ? '00' : i;
    minutes.push({ label: iLabel, value: i });
  }
  return minutes;
};

class TimeInput extends React.Component {
  constructor() {
    super();
    this.state = {
      hour: 1,
      minute: 0, // '00',
      period: 'am',
    };
  }
  onChange = (e, type) => {
    if (e) {
      this.setState({
        [type]: e.value,
      });

      setTimeout(() => {
        const hourMoment =
          this.state.period === 'pm' ? this.state.hour + 12 : this.state.hour;

        const thisMoment = moment()
          .hour(hourMoment)
          .minute(this.state.minute)
          .format('h:mm a');
      }, 0);
    }
  };
  render() {
    return (
      <div className="TimeInput">
        <Select
          className="TimeInput__hour-selector"
          name="hour-selector"
          placeholder="1"
          clearable={false}
          value={{
            label: this.state.hour,
            value: this.state.hour,
          }}
          onChange={e => {
            this.onChange(e, 'hour');
          }}
          options={hourOptions()}
        />
        <span className="TimeInput__colon">:</span>
        <Select
          className="TimeInput__minute-selector"
          name="minute-selector"
          placeholder="00"
          clearable={false}
          value={{
            label: this.state.minute,
            value: this.state.minute,
          }}
          onChange={e => {
            this.onChange(e, 'minute');
          }}
          options={minuteOptions()}
        />
        <span className="TimeInput__spacer" />
        <Select
          className="TimeInput__period-selector"
          name="period-selector"
          placeholder="AM"
          clearable={false}
          value={{
            label: this.state.period,
            value: this.state.period,
          }}
          onChange={e => {
            this.onChange(e, 'period');
          }}
          options={[
            {
              label: 'am',
              value: 'am',
            },
            {
              label: 'pm',
              value: 'pm',
            },
          ]}
        />
      </div>
    );
  }
}

export default TimeInput;
