import { PieChart } from 'react-minimal-pie-chart';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

const DonutCharts = props => {
	console.log(JSON.stringify(colors));
	return (
		<div className="flex max-h-60 w-full justify-between space-x-10 px-3 md:px-20">
			<PieChart
				data={[
					{ value: props.teamstats.GOOD, color: colors.emerald['500'] },
					{ value: props.teamstats.WARNING, color: colors.slate['700'] },
					{ value: props.teamstats.FAILURE, color: colors.slate['700'] },
				]}
				lineWidth="10"
				rounded={true}
				animate={true}>
				<text dominant-baseline="central" x="50" y="50" dy="-10" text-anchor="middle" className="fill-good text-xl">
					{props.teamstats.GOOD}
				</text>
				<text dominant-baseline="central" x="50" y="50" dy="10" text-anchor="middle" className=" fill-good/75 text-xs font-light">
					GOOD
				</text>
			</PieChart>
			<PieChart
				data={[
					{ value: props.teamstats.GOOD, color: colors.slate['700'] },
					{ value: props.teamstats.WARNING, color: colors.yellow['300'] },
					{ value: props.teamstats.FAILURE, color: colors.slate['700'] },
				]}
				lineWidth="10"
				rounded={true}
				animate={true}>
				<text dominant-baseline="central" x="50" y="50" dy="-10" text-anchor="middle" className="fill-warning text-xl">
					{props.teamstats.WARNING}
				</text>
				<text dominant-baseline="central" x="50" y="50" dy="10" text-anchor="middle" className=" fill-warning/50 text-xs font-light">
					WARNING
				</text>
			</PieChart>
			<PieChart
				data={[
					{ value: props.teamstats.GOOD, color: colors.slate['700'] },
					{ value: props.teamstats.WARNING, color: colors.slate['700'] },
					{ value: props.teamstats.FAILURE, color: colors.red['500'] },
				]}
				lineWidth="10"
				rounded={true}
				animate={true}>
				<text dominant-baseline="central" x="50" y="50" dy="-10" text-anchor="middle" className="fill-failure text-xl">
					{props.teamstats.FAILURE}
				</text>
				<text dominant-baseline="central" x="50" y="50" dy="10" text-anchor="middle" className=" fill-failure/75 text-xs font-light">
					FAIL
				</text>
			</PieChart>
		</div>
	);
};
export default DonutCharts;
