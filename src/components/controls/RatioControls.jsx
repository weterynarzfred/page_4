import React from 'react';
import { connect } from 'react-redux';
import { Pie, PieChart, Sector } from 'recharts';
import { deepEquals } from '../../functions/deepFunctions';
import formatNumber from '../../functions/formatNumber';
import { getSelectedValue } from '../../functions/getSelectedValue';

function RatioControls(props) {
  if (props.selectedValue.length === 0) return null;

  return <div className="RatioControls">
    <PieChart width={450} height={250}>
      <Pie
        data={props.selectedValue}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={0}
        outerRadius={80}
        animationEasing="linear"
        animationBegin={0}
        animationDuration={200}
        minAngle={10}
        label={({
          cx,
          cy,
          midAngle,
          outerRadius,
          percent,
          title
        }) => {
          if (percent === 0) return null;
          const radius = outerRadius * 1.3;
          let x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
          x += x > cx ? 5 : - 5;
          const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
          return <text
            x={x}
            y={y}
            fill="#fff"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="text-top"
          >
            <tspan fontSize="12">{title}</tspan>
            <tspan x={x} dy={16} fontSize="16">
              {formatNumber(percent, 3, { usePercent: true, showSignificant: true })}
            </tspan>
          </text>;
        }}
      />
    </PieChart>
  </div>;
}

export default connect((state, props) => {
  return {
    selectedValue: getSelectedValue(state.options[props.optionKey], state.options),
  };
}, null, null, { areStatePropsEqual: deepEquals })(RatioControls);