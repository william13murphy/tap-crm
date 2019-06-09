import React from 'react';
import styleVariables from 'styles/_variables';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import { localCurrencySymbol } from 'util/localization/localValues';

/*

SimpleBarChart data example:

let data = [
  {
    name: 'Jan 1',
    Horses: 100,
    Chickens: 150,
  },
  {
    name: 'Jan 2',
    Horses: 111,
    Chickens: 200,
  },
];

let dataKeys = ['Horses', 'Chickens'];

// Note that each dataKey corresponds to a key in the Data object.
// Each dataKey item will become a key in the bottom of the chart

*/

type SimpleBarChartProps = {
  data: Array<{
    name: string, // The `name` will display below the column.
    // Each key in the object will become a Bar
    // Each key should match a dataKey value.
  }>,
  dataKeys: [], // An array of strings, which correspond to keys in the `data` object.
  responsiveWidth: number,
  stackId: string,
  itemSorter: Function,
  color?: string, // Optional: Choose the bar color
  currency?: boolean,
};

const allColors = [];
const baseBarColors = [
  styleVariables.soft_violet,
  styleVariables.melon_orange,
  styleVariables.forest1,
  styleVariables.cyan,
  styleVariables.azure_blue,
  styleVariables.mossy_green,
  styleVariables.yellow,
  styleVariables.blood,
  styleVariables.turquoise,
  styleVariables.rose5,
  styleVariables.violet1,
  styleVariables.forest5,
  styleVariables.sepia1,
];

for (let key in styleVariables) {
  allColors.push(styleVariables[key]);
}

const barColors = baseBarColors.concat(allColors);

class SimpleBarChart extends React.Component {
  props: SimpleBarChartProps;

  itemSorter = (item1, item2) => {
    return 1;
  };

  render() {
    const formatter = this.props.currency
      ? value => localCurrencySymbol() + value.toLocaleString()
      : null;
    return (
      <div className="SimpleBarChart">
        <BarChart
          width={this.props.responsiveWidth}
          height={300}
          data={this.props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis tickFormatter={formatter} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip
            formatter={formatter}
            itemSorter={this.props.itemSorter || this.itemSorter}
          />
          <Legend />
          {this.props.dataKeys ? (
            this.props.dataKeys.map((item, index) => {
              return (
                <Bar
                  key={item}
                  stackId={this.props.stackId}
                  dataKey={item}
                  fill={this.props.color || barColors[index]}
                />
              );
            })
          ) : (
            <Bar stackId={this.props.stackId} fill={barColors[0]} />
          )}
        </BarChart>
      </div>
    );
  }
}

export { SimpleBarChart as default };
