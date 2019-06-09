// import Recharts from 'recharts';
import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import './styles.less';

interface ISimplePieChartProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

const data = [
  { name: 'Brazilian Jiu Jitsu', value: 300 },
  { name: 'Karate', value: 500 },
  { name: 'Muay Thai', value: 300 },
  { name: 'Taekwondo', value: 250 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
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
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class SimplePieChart extends React.Component<ISimplePieChartProps> {
  render() {
    return (
      <div className="Pie__crust">
        <PieChart width={500} height={300}>
          <Pie
            data={data}
            cx={300}
            cy={100}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </div>
    );
  }
}

export { SimplePieChart as default };
