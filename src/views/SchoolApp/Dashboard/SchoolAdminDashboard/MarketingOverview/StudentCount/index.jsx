import React from 'react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import styleVariables from 'styles/_variables';
import monthsTri from 'src/redux/data/monthsTri';

const revenueArray = new Array(12).fill(0);
const revenueBars = revenueArray.map((cV, i) => {
  return {
    name: monthsTri[i],
    Students: Math.floor(Math.random() * 50) + (40 * i + 200),
  };
});
const data = revenueBars;

type StudentCountProps = {
  responsiveWidth: number,
};

class StudentCount extends React.Component {
  props: StudentCountProps;
  render() {
    return (
      <LineChart
        width={this.props.responsiveWidth}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Legend />
        <Line
          type="monotone"
          dataKey="Students"
          stroke={styleVariables.azure_blue}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}

export default StudentCount;
