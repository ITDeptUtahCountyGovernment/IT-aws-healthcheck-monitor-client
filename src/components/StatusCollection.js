import Status from './Status';

const StatusCollection = props => {
	return (
		<table className="w-full text-left text-xs text-gray-400 md:text-base">
			<thead className="bg-slate-800 text-xs uppercase text-gray-200 ">
				<tr>
					<th scope="col">Apps ({props.data.length})</th>
					<th scope="col">Status</th>
					<th scope="col">Tier</th>
					{props.showTeam && <th>Team</th>}
					<th scope="col">Uptime</th>
					<th scope="col">Links</th>
				</tr>
			</thead>
			{props.data.map(entry => {
				return <Status entry={entry} key={entry.id} showTeam={props.showTeam} />;
			})}
		</table>
	);
};

export default StatusCollection;
