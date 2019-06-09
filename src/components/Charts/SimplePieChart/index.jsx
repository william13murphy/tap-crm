// import Recharts from 'recharts';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import styleVariables from 'styles/_variables';
import './styles.less';

const allColors = [];
const basePieColors = [
  styleVariables.soft_violet,
  styleVariables.cyan,
  styleVariables.azure_blue,
  styleVariables.melon_orange,
  styleVariables.pumpkin_orange,
  styleVariables.mossy_green,
  styleVariables.blood,
  styleVariables.forest1,
  styleVariables.indigo3,
  styleVariables.lime3,
  styleVariables.vermilion3,
  styleVariables.rose5,
  styleVariables.violet1,
  styleVariables.forest5,
  styleVariables.sepia1,
];

for (let key in styleVariables) {
  allColors.push(styleVariables[key]);
}

const pieColors = basePieColors.concat(allColors);

const RADIAN = Math.PI / 180;

type SimplePieChartProps = {
  data: [],
};

class SimplePieChart extends React.Component {
  props: SimplePieChartProps;

  constructor() {
    super();
    this.state = {
      cx: 150,
      cy: 110,
      pieWidth: 300,
      pieHeight: 300,
      outerRadius: 90,
    };
  }

  renderCustomizedLabel = item => {
    let { value, cx, cy, midAngle, innerRadius, outerRadius, percent } = item;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {value}
        {/* {`${(percent * 100).toFixed(0)}%`} */}
      </text>
    );
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    let screenWidth = window.innerWidth;
    let tabWidth = +styleVariables.dimension_tablet_small.slice(
      0,
      styleVariables.dimension_tablet_small.length - 2
    );
    if (screenWidth > tabWidth) {
      this.setState({
        cx: 250,
        cy: 110,
        pieWidth: 500,
        pieHeight: 300,
        outerRadius: 110,
      });
    } else {
      this.setState({
        cx: 150,
        cy: 110,
        pieWidth: 300,
        pieHeight: 300,
        outerRadius: 90,
      });
    }
  };

  render() {
    return (
      <div className="Pie__crust">
        <PieChart width={this.state.pieWidth} height={this.state.pieHeight}>
          <Pie
            dataKey="value"
            data={this.props.data}
            cx={this.state.cx}
            cy={this.state.cy}
            labelLine={false}
            label={this.renderCustomizedLabel}
            outerRadius={this.state.outerRadius}
            fill="#8884d8"
          >
            {this.props.data.map((entry, index) => (
              <Cell key={index} fill={pieColors[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => value.toLocaleString()} active={true} payload={[]} />
          <Legend />
        </PieChart>
      </div>
    );
  }
}

export { SimplePieChart as default };
