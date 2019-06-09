import React from 'react';
import './styles.less';
import styleVariables from 'styles/_variables';
// class PercentCompleteFormatter extends React.Component {
//   static propTypes = {
//     value: PropTypes.number.isRequired
//   };
//
//   render() {
//     const percentComplete = this.props.value + '%';
//     return (
//       <div className="progress" style={{marginTop: '20px'}}>
//         <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: percentComplete}}>
//           {percentComplete}
//         </div>
//       </div>);
//   }
// }

type PercentBarProps = {
  percent: number,
  backgroundColor: string,
  color: string,
  height: number,
  rainbow: boolean,
  label?: string,
  center?: boolean,
};

const getRainbowColor = percent => {
  if (percent < 25) {
    return styleVariables.blood;
  } else if (percent >= 25 && percent < 75) {
    return styleVariables.pumpkin_orange;
  } else if (percent >= 75 && percent <= 100) {
    return styleVariables.mossy_green;
  } else if (percent > 100) {
    return styleVariables.mossy_green;
  }
};

const PercentBar = (props: PercentBarProps) => {
  const percentComplete = Math.min(100, props.percent).toString() + '%';
  const height = props.height ? props.height.toString + 'px' : '25px';
  const backgroundColor =
    props.backgroundColor || getRainbowColor(props.percent);
  return (
    <div className="PercentBar__container">
      <div
        className="PercentBar"
        style={{
          width: percentComplete,
          color: props.color || '#fff',
          backgroundColor: backgroundColor,
          height: height,
        }}
      >
        <div
          className="PercentBar__value"
          style={{
            marginLeft: props.percent < 30 ? '30px' : 0,
          }}
        >
          {props.label || percentComplete}
        </div>
      </div>
    </div>
  );
};

export default PercentBar;
