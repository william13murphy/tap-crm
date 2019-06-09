import React from 'react';
import { Link } from 'react-router-dom';
import { hidden } from 'ansi-colors';
import './styles.less';
import { Spring, config } from 'react-spring/renderprops';

type StatisticProps = {
  statistic?: string,
  label?: string,
  onClick?: any,
  backgroundColor: ?string,
  statisticColor: ?string,
  labelColor: ?string,
  isLoading: ?boolean,
  defaultValue: ?string,
};

export default class Statistic extends React.PureComponent<StatisticProps> {
  render() {
    const {
      backgroundColor,
      statistic,
      labelColor,
      isLoading,
      defaultValue = 0,
    } = this.props;

    return (
      <div
        className="Statistic"
        onClick={this.handleClick}
        style={{ backgroundColor }}
      >
        {isLoading ? <div className="blinkingDot" /> : null}
        {this.animateValue(defaultValue, statistic)}
        <div className="Label" style={{ color: this.props.statisticColor }}>

          {this.props.label}
        </div>
      </div>
    );
  }

  animateValue = (from = 0, to) => {
    return (
      <Spring
        config={config.slow}
        from={{ number: parseInt(from) || 0 }}
        to={{ number: parseInt(to) || 0 }}
      >
        {props => (
          <div className="Value" style={{ color: this.props.statisticColor }}>
            {props.number.toFixed(0)}
          </div>
        )}
      </Spring>
    );
  };

  handleClick = e => {
    this.props.onClick && this.props.onClick();
  };
}
