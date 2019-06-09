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
    SocialMedia: Math.floor(Math.random() * 3000) + 1000,
    WalkIns: Math.floor(Math.random() * 3000) + 100,
    Referrals: Math.floor(Math.random() * 5000) + 1000,
    PrintAds: Math.floor(Math.random() * 2400) + 100,
    BuddyEvents: Math.floor(Math.random() * 4000) + 2000,
    ConferenceBooth: Math.floor(Math.random() * 1500) + 100,
  };
});
const data = revenueBars;

type InboundInquiriesProps = {
  responsiveWidth: number,
};

class InboundInquiries extends React.Component {
  props: InboundInquiriesProps;
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
        <Tooltip />
        <Legend />
        <Bar
          dataKey="SocialMedia"
          stackId="a"
          fill={styleVariables.azure_blue}
        />
        <Bar dataKey="WalkIns" stackId="a" fill={styleVariables.sea_green} />
        <Bar
          dataKey="Referrals"
          stackId="a"
          fill={styleVariables.melon_orange}
        />
        <Bar
          dataKey="PrintAds"
          stackId="a"
          fill={styleVariables.pumpkin_orange}
        />
        <Bar
          dataKey="BuddyEvents"
          stackId="a"
          fill={styleVariables.soft_violet}
        />
        <Bar dataKey="ConferenceBooth" stackId="a" fill={styleVariables.cyan} />
      </BarChart>
    );
  }
}

export default InboundInquiries;
