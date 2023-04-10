import { PieChart } from 'react-minimal-pie-chart';
import colors from 'tailwindcss/colors';

const DonutCharts = (props) => {
  return (
    <div className="flex max-h-80 w-full justify-between space-x-10 px-3 md:px-20">
      <PieChart
        data={[
          { value: props.teamstats.GOOD, color: 'rgba(16, 185, 129, 0.5)' },
          { value: props.teamstats.WARNING, color: 'rgba(51, 65, 85, 0.5)' },
          { value: props.teamstats.FAILURE, color: 'rgba(51, 65, 85, 0.5)' },
        ]}
        lineWidth="25"
        animate={true}
      >
        <PieChart
          data={[
            { value: props.teamstats.GOOD, color: colors.emerald['500'] },
            { value: props.teamstats.WARNING, color: colors.slate['700'] },
            { value: props.teamstats.FAILURE, color: colors.slate['700'] },
          ]}
          lineWidth="10"
          animate={true}
        >
          <text
            dominantBaseline="central"
            x="50"
            y="50"
            dy="-10"
            textAnchor="middle"
            className="fill-good text-xl"
          >
            {props.teamstats.GOOD}
          </text>
          <text
            dominantBaseline="central"
            x="50"
            y="50"
            dy="10"
            textAnchor="middle"
            className=" fill-good/75 text-xs font-light"
          >
            GOOD
          </text>
        </PieChart>
      </PieChart>
      <PieChart
        data={[
          { value: props.teamstats.GOOD, color: 'rgba(51, 65, 85, 0.5)' },
          { value: props.teamstats.WARNING, color: 'rgba(253, 224, 71, 0.5)' },
          { value: props.teamstats.FAILURE, color: 'rgba(51, 65, 85, 0.5)' },
        ]}
        lineWidth="25"
        animate={true}
      >
        <PieChart
          data={[
            { value: props.teamstats.GOOD, color: colors.slate['700'] },
            { value: props.teamstats.WARNING, color: colors.yellow['300'] },
            { value: props.teamstats.FAILURE, color: colors.slate['700'] },
          ]}
          lineWidth="10"
          animate={true}
        >
          <text
            dominantBaseline="central"
            x="50"
            y="50"
            dy="-10"
            textAnchor="middle"
            className="fill-warning text-xl"
          >
            {props.teamstats.WARNING}
          </text>
          <text
            dominantBaseline="central"
            x="50"
            y="50"
            dy="10"
            textAnchor="middle"
            className=" fill-warning/50 text-xs font-light"
          >
            WARNING
          </text>
        </PieChart>
      </PieChart>
      <PieChart
        data={[
          { value: props.teamstats.GOOD, color: 'rgba(51, 65, 85, 0.5)' },
          { value: props.teamstats.WARNING, color: 'rgba(51, 65, 85, 0.5)' },
          { value: props.teamstats.FAILURE, color: 'rgba(239, 68, 68, 0.5)' },
        ]}
        lineWidth="25"
        animate={true}
      >
        <PieChart
          data={[
            { value: props.teamstats.GOOD, color: colors.slate['700'] },
            { value: props.teamstats.WARNING, color: colors.slate['700'] },
            { value: props.teamstats.FAILURE, color: colors.red['500'] },
          ]}
          lineWidth="10"
          rounded={true}
          animate={true}
        >
          <text
            dominantBaseline="central"
            x="50"
            y="50"
            dy="-10"
            textAnchor="middle"
            className="fill-failure text-xl"
          >
            {props.teamstats.FAILURE}
          </text>
          <text
            dominantBaseline="central"
            x="50"
            y="50"
            dy="10"
            textAnchor="middle"
            className=" fill-failure/75 text-xs font-light"
          >
            FAIL
          </text>
        </PieChart>
      </PieChart>
    </div>
  );
};
export default DonutCharts;
