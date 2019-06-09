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

import monthsTri from 'src/redux/data/monthsTri';

const revenueArray = new Array(12).fill(0);
const revenueBars = revenueArray.map((cV, i) => {
  return {
    name: monthsTri[i],
    BrazilianJiuJitsu: Math.floor(Math.random() * 10) + 1 * i,
    MuayThai: Math.floor(Math.random() * 10) + 2 * i,
    Karate: Math.floor(Math.random() * 10) + 2 * i,
    Taekwondo: Math.floor(Math.random() * 10) + 3 * i,
  };
});
const data = revenueBars;

type EnrollmentsPerProgramProps = {
  responsiveWidth: number,
};

class EnrollmentsPerProgram extends React.Component {
  props: EnrollmentsPerProgramProps;
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
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Legend />
        <Bar dataKey="BrazilianJiuJitsu" fill="#0088FE" />
        <Bar dataKey="MuayThai" fill="#00C49F" />
        <Bar dataKey="Karate" fill="#FFBB28" />
        <Bar dataKey="Taekwondo" fill="#FF8042" />
      </BarChart>
    );
  }
}

export { EnrollmentsPerProgram as default };
