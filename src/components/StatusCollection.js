import Status from './Status';

const StatusCollection = props => {
	return (
		<table className=" mb-8 rounded-lg border-b border-l text-left dark:text-gray-400">
			<thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col">App Name</th>
					<th scope="col">Status</th>
					<th scope="col">Uptime</th>
					<th scope="col">Links</th>
				</tr>
			</thead>
			{props.data.map(entry => {
				return entry.name === props.team && <Status entry={entry} key={entry.id} />;
			})}
		</table>
	);
};

export default StatusCollection;
