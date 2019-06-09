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
    Inquiries: Math.floor(Math.random() * 40) + 16 * i,
    Bookings: Math.floor(Math.random() * 40) + 13 * i,
    Intros: Math.floor(Math.random() * 40) + 11 * i,
    Enrollments: Math.floor(Math.random() * 55) + 7 * i,
  };
});
const data = revenueBars;

type ActivitySummaryProps = {
  responsiveWidth: number,
};

class ActivitySummary extends React.Component {
  props: ActivitySummaryProps;
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
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Inquiries"
          stroke={styleVariables.azure_blue}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Bookings"
          stroke={styleVariables.sea_green}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Intros"
          stroke={styleVariables.melon_orange}
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="Enrollments"
          stroke={styleVariables.soft_violet}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}

export default ActivitySummary;
