import React from 'react';
import Status from './Status';

const StatusCollection = props => {
	return (
		<div>
			{props.data.map(entry => {
				return (
					<div key={entry.id}>
						<Status entry={entry} />
					</div>
				);
			})}
		</div>
	);
};

export default StatusCollection;
