import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import styleVariables from 'styles/_variables';

const data = [
  {
    name: 'Sun',
    Attendance: 1400,
  },
  {
    name: 'Mon',
    Attendance: 1300,
  },
  {
    name: 'Tue',
    Attendance: 1100,
  },
  {
    name: 'Wed',
    Attendance: 1300,
  },
  {
    name: 'Thu',
    Attendance: 1400,
  },
  {
    name: 'Fri',
    Attendance: 1500,
  },
  {
    name: 'Sat',
    Attendance: 1600,
  },
];

type AttendanceCumulativeProps = {
  responsiveWidth: number,
};

class AttendanceCumulative extends React.Component {
  props: AttendanceCumulativeProps;
  render() {
    return (
      <BarChart
        width={this.props.responsiveWidth}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={(value) => value.toLocaleString()}/>
        <Legend />
        <Bar dataKey="Attendance" fill={styleVariables.sea_green} />
      </BarChart>
    );
  }
}

export { AttendanceCumulative as default };
