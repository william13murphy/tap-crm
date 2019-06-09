import React from 'react';
import './styles.less';
import styleVariables from 'styles/_variables';

type ProgressBarProps = {
  percent: number,
  backgroundColor: string,
  color: string,
  height: number,
  rainbow: boolean,
  label?: string,
  center?: boolean,
};

const getProgressPercentageColor = percent => {
  return styleVariables.mossy_green;
};

const ProgressBar = (props: ProgressBarProps) => {
  const percentComplete = Math.min(100, props.percent).toString() + '%';
  const height = props.height ? props.height.toString + 'px' : '25px';
  const backgroundColor =
    props.backgroundColor || getProgressPercentageColor(props.percent);
  return (
    <div className="ProgressBar__container">
      <div
        className="ProgressBar"
        style={{
          width: percentComplete,
          color: props.color || '#fff',
          backgroundColor: backgroundColor,
          height: height,
        }}
      >
        <div
          className="ProgressBar__value"
          style={{
            marginLeft: props.percent < 30 ? '30px' : 0,
          }}
        >
          {props.label || percentComplete}
        </div>
        {props.label && (
          <div className="Progressbar__blinkingDot_container">
            <span className="Progressbar__blinkingDot_item">.</span>
            <span className="Progressbar__blinkingDot_item">.</span>
            <span className="Progressbar__blinkingDot_item">.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
