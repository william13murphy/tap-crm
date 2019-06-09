import * as React from 'react';
import { Slider } from '@blueprintjs/core';

export interface IZipSliderState {
  value?: number;
}

export class ZipSlider extends React.Component<IZipSliderState> {
  state: IZipSliderState = {
    value: 20815,
  };

  render() {
    return (
      <div
        className="SliderExample"
        style={{ width: '100%', marginTop: '10px' }}
      >
        <div>
          <Slider
            min={0}
            max={99999}
            stepSize={1}
            showTrackFill={false}
            labelStepSize={20000}
            onChange={this.getChangeHandler('value')}
            value={this.state.value}
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
