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
    BrazilianJiuJitsu: 100,
    MuayThai: 240,
    Karate: 250,
    Taekwondo: 460,
    amt: 240,
  },
  {
    name: 'Mon',
    BrazilianJiuJitsu: 200,
    MuayThai: 340,
    Karate: 450,
    Taekwondo: 360,
  },
  {
    name: 'Tue',
    BrazilianJiuJitsu: 250,
    MuayThai: 320,
    Karate: 220,
    Taekwondo: 460,
  },
  {
    name: 'Wed',
    BrazilianJiuJitsu: 100,
    MuayThai: 300,
    Karate: 450,
    Taekwondo: 510,
  },
  {
    name: 'Thu',
    BrazilianJiuJitsu: 100,
    MuayThai: 340,
    Karate: 50,
    Taekwondo: 440,
  },
  {
    name: 'Fri',
    BrazilianJiuJitsu: 200,
    MuayThai: 340,
    Karate: 450,
    Taekwondo: 560,
  },
  {
    name: 'Sat',
    BrazilianJiuJitsu: 100,
    MuayThai: 440,
    Karate: 350,
    Taekwondo: 460,
  },
];

type AttendancePerProgramProps = {
  responsiveWidth: number,
};

class AttendancePerProgram extends React.Component {
  props: AttendancePerProgramProps;
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
        <Bar dataKey="BrazilianJiuJitsu" fill={styleVariables.soft_violet} />
        <Bar dataKey="MuayThai" fill={styleVariables.cyan} />
        <Bar dataKey="Karate" fill={styleVariables.azure_blue} />
        <Bar dataKey="Taekwondo" fill={styleVariables.melon_orange} />
      </BarChart>
    );
  }
}

export { AttendancePerProgram as default };
