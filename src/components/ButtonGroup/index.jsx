import React from 'react';
import './styles.less';
import styleVariables from 'styles/_variables';

class ButtonGroup extends React.Component {
  props: {
    active: string,
    onClick: Function,
    data: [
      {
        key: string,
        name: string,
      },
    ],
  };
  render() {
    return (
      <div className="ButtonGroup">
        {this.props.data.map(item => {
          return (
            <button
              key={item.key}
              onClick={() => this.props.onClick(item.key)}
              style={{
                backgroundColor:
                  this.props.active === item.key
                    ? styleVariables.navy
                    : styleVariables.gray3,
              }}
              type="button"
              className="ButtonGroup__item pt-button pt-intent-success"
            >
              {item.name}
            </button>
          );
        })}
      </div>
    );
  }
}

export default ButtonGroup;
