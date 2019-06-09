import React from 'react';
// import { Recharts } from 'recharts';
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
import monthsTri from 'src/redux/data/monthsTri';

const revenueArray = new Array(12).fill(0);
const revenueBars = revenueArray.map((cV, i) => {
  return {
    name: monthsTri[i],
    TuitionFeesEFC: Math.floor(Math.random() * 10000) + 3000 * i,
    TuitionFeesCash: Math.floor(Math.random() * 10000) + 3000 * i,
    NetProductSales: Math.floor(Math.random() * 1000) + 500 * i,
  };
});
const data = revenueBars;

type RevenueProps = {
  responsiveWidth: number,
};

class Revenue extends React.Component {
  props: RevenueProps;
  render() {
    return (
      <BarChart
        width={this.props.responsiveWidth}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Legend />
        <Bar
          dataKey="TuitionFeesEFC"
          stackId="a"
          fill={styleVariables.azure_blue}
        />
        <Bar
          dataKey="TuitionFeesCash"
          stackId="a"
          fill={styleVariables.sea_green}
        />
        <Bar
          dataKey="NetProductSales"
          stackId="a"
          fill={styleVariables.melon_orange}
        />
      </BarChart>
    );
  }
}

export default Revenue;
