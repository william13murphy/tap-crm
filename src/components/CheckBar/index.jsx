import React from 'react';
import './styles.less';
import styleVariables from 'styles/_variables';

type CheckBarProps = {
  unchecked: number,
  checked: number,
  checkedColor: string,
  uncheckedColor: string,
  title: string,
  size?: number,
};

const CheckBar = (props: CheckBarProps) => {
  let uncheckedMin = 0;
  if (props.unchecked < 0) {
    // If data shows more skills attained than required...
    uncheckedMin = 0;
  } else {
    uncheckedMin = props.unchecked;
  }
  let checked = new Array(props.checked).fill(0);
  let unchecked = new Array(uncheckedMin).fill(0);
  let size = props.size ? props.size.toString() + 'px' : '18px';

  return (
    <div className="CheckBar">
      {checked.map((item, index) => {
        return (
          <div className="Checked__skill" key={index} title={props.title}>
            <i
              className={'fa fa-check'}
              aria-hidden="true"
              style={{
                color: props.checkedColor || styleVariables.mossy_green,
                fontSize: size,
              }}
            />
          </div>
        );
      })}
      {unchecked.map((item, index) => {
        return (
          <div className="UnChecked__skill" key={index} title={props.title}>
            <i
              className={'fa fa-check'}
              aria-hidden="true"
              style={{
                color: props.uncheckedColor || styleVariables.light_gray1,
                fontSize: size,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CheckBar;
