import { PieChart } from 'react-minimal-pie-chart';

const DonutCharts = props => {
	return (
		<div className="flex max-h-80 w-full justify-between space-x-10 px-3 md:px-0 md:px-6">
			<PieChart
				data={[
					{ title: 'GOOD', value: props.teamstats.GOOD, color: '#10B981' },
					{ title: 'WARNING', value: props.teamstats.WARNING, color: '#334155' },
					{ title: 'FAILURE', value: props.teamstats.FAILURE, color: '#334155' },
				]}
				lineWidth="10"
				rounded={true}
				label={() => props.teamstats.GOOD + ' GOOD'}
				labelPosition="0"
				labelStyle={{
					fill: '#10B981',
					fontSize: '8pt',
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
				label={() => props.teamstats.FAILURE + ' FAIL'}
				labelPosition="0"
				labelStyle={{
					fill: '#ef4444',
					fontSize: '8pt',
				}}
				animate={true}
			/>
		</div>
	);
};
export default DonutCharts;
