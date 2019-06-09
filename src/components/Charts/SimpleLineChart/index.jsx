import React from 'react';
// import './styles.less';
import styleVariables from 'styles/_variables';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const allColors = [];
const baseLineColors = [
  styleVariables.soft_violet,
  styleVariables.melon_orange,
  styleVariables.forest1,
  styleVariables.cyan,
  styleVariables.azure_blue,
  styleVariables.mossy_green,
  styleVariables.blood,
  styleVariables.sepia5,
];

for (let key in styleVariables) {
  allColors.push(styleVariables[key]);
}

const lineColors = baseLineColors.concat(allColors);

type SimpleLineChartProps = {
  data: [],
  dataKeys: [],
  responsiveWidth: number,
};

class SimpleLineChart extends React.Component {
  props: SimpleLineChartProps;
  render() {
    return (
      <LineChart
        width={this.props.responsiveWidth}
        height={300}
        data={this.props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Legend />
        {this.props.dataKeys &&
          this.props.dataKeys.map((item, index) => {
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={item}
                stroke={lineColors[index]}
                activeDot={{ r: 8 }}
              />
            );
          })}
      </LineChart>
    );
  }
}

export default SimpleLineChart;
