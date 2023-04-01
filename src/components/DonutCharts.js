import { PieChart } from 'react-minimal-pie-chart';

const DonutCharts = props => {
	return (
		<div className="flex max-h-80 w-full justify-between">
			<PieChart
				data={[
					{ title: 'GOOD', value: props.teamstats.GOOD, color: '#3b82f6' },
					{ title: 'WARNING', value: props.teamstats.WARNING, color: '#334155' },
					{ title: 'FAILURE', value: props.teamstats.FAILURE, color: '#334155' },
				]}
				lineWidth="10"
				rounded={true}
				label={() => props.teamstats.GOOD}
				labelPosition="0"
				labelStyle={{
					fill: '#3b82f6',
				}}
				animate={true}
			/>
			<PieChart
				data={[
					{ title: 'GOOD', value: props.teamstats.GOOD, color: '#334155' },
					{ title: 'WARNING', value: props.teamstats.WARNING, color: '#eab308' },
					{ title: 'FAILURE', value: props.teamstats.FAILURE, color: '#334155' },
				]}
				lineWidth="10"
				rounded={true}
				label={() => props.teamstats.WARNING}
				labelPosition="0"
				labelStyle={{
					fill: '#eab308',
				}}
				animate={true}
			/>
			<PieChart
				data={[
					{ title: 'GOOD', value: props.teamstats.GOOD, color: '#334155' },
					{ title: 'WARNING', value: props.teamstats.WARNING, color: '#334155' },
					{ title: 'FAILURE', value: props.teamstats.FAILURE, color: '#ef4444' },
				]}
				lineWidth="10"
				rounded={true}
				label={() => props.teamstats.FAILURE}
				labelPosition="0"
				labelStyle={{
					fill: '#ef4444',
				}}
				animate={true}
			/>
		</div>
	);
};
export default DonutCharts;
