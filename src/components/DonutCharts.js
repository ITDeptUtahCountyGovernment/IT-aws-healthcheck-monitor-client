import { PieChart } from 'react-minimal-pie-chart';
import colors from 'tailwindcss/colors';

const DonutCharts = props => {
	return (
		<div className="flex max-h-80 w-full justify-between space-x-10 px-3 md:px-0">
			<PieChart
				data={[
					{ title: 'GOOD', value: props.teamstats.GOOD, color: colors.emerald['500'] },
					{ title: 'WARNING', value: props.teamstats.WARNING, color: colors.slate['700'] },
					{ title: 'FAILURE', value: props.teamstats.FAILURE, color: colors.slate['700'] },
				]}
				lineWidth="10"
				rounded={true}
				label={() => props.teamstats.GOOD + ' GOOD'}
				labelPosition="0"
				labelStyle={{
					fill: colors.emerald['500'],
					fontSize: '8pt',
				}}
				animate={true}
			/>
			<PieChart
				data={[
					{ title: 'GOOD', value: props.teamstats.GOOD, color: colors.slate['700'] },
					{ title: 'WARNING', value: props.teamstats.WARNING, color: colors.yellow['300'] },
					{ title: 'FAILURE', value: props.teamstats.FAILURE, color: colors.slate['700'] },
				]}
				lineWidth="10"
				rounded={true}
				label={() => props.teamstats.WARNING + ' WARNING'}
				labelPosition="0"
				labelStyle={{
					fill: colors.yellow['300'],
					fontSize: '8pt',
				}}
				animate={true}
			/>
			<PieChart
				data={[
					{ title: 'GOOD', value: props.teamstats.GOOD, color: colors.slate['700'] },
					{ title: 'WARNING', value: props.teamstats.WARNING, color: colors.slate['700'] },
					{ title: 'FAILURE', value: props.teamstats.FAILURE, color: colors.red['500'] },
				]}
				lineWidth="10"
				rounded={true}
				label={() => props.teamstats.FAILURE + ' FAIL'}
				labelPosition="0"
				labelStyle={{
					fill: colors.red['500'],
					fontSize: '8pt',
				}}
				animate={true}
			/>
		</div>
	);
};
export default DonutCharts;
