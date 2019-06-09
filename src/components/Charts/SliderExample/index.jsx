import * as React from 'react';
import { Slider } from '@blueprintjs/core';

export interface ISliderExampleState {
  value1?: number;
  value2?: number;
  value3?: number;
}

export class SliderExample extends React.Component<ISliderExampleState> {
  state: ISliderExampleState = {
    value1: 0,
    value2: 2.5,
    value3: 30,
  };

  render() {
    return (
      <div className="SliderExample" style={{ width: '90%', marginLeft: '5%' }}>
        <div>
          <Slider
            min={0}
            max={10}
            stepSize={0.1}
            labelStepSize={10}
            onChange={this.getChangeHandler('value2')}
            value={this.state.value2}
          />
          <Slider
            min={0}
            max={0.7}
            stepSize={0.01}
            labelStepSize={0.14}
            onChange={this.getChangeHandler('value1')}
            renderLabel={this.renderLabel1}
            value={this.state.value1}
          />
          <Slider
            min={-12}
            max={48}
            stepSize={6}
            labelStepSize={10}
            onChange={this.getChangeHandler('value3')}
            renderLabel={this.renderLabel3}
            showTrackFill={false}
            value={this.state.value3}
          />
        </div>
      </div>
    );
  }

  getChangeHandler(key: string) {
    return (value: number) => this.setState({ [key]: value });
  }

  renderLabel1(val: number) {
    return `${Math.round(val * 100)}%`;
  }

  renderLabel3(val: number) {
    return val === 0 ? `£${val}` : `£${val},000`;
  }
}
