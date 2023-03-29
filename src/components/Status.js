import React, { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { BiLink } from 'react-icons/bi';
import { months } from '../utils/utils.js';
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const Status = props => {
	const [entry, setEntry] = useState(props.entry);
	const [showDetails, setShowDetails] = useState(false);

	const getStatusIcon = () => {
		switch (entry.status) {
			case 'GOOD':
				return '🟢 ';
			case 'WARNING':
				return '⚠️';
			case 'FAILURE':
				return '⛔️';
		}
	};

	const getSince = uptime => {
		const since = new Date(Math.max(Date.now() - ONE_YEAR_MS, uptime));
		return `${months[since.getMonth()]} ${since.getDate()} ${since.getFullYear()}`;
	};

	const toggleDetails = () => {
		setShowDetails(showDetails ? false : true);
	};

	return (
		<tr className="bg-white hover:bg-slate-50 dark:border-gray-700 dark:bg-gray-800">
			<td>{entry.title}</td>
			<td>{getStatusIcon()}</td>
			<td className="flex flex-col">
				<div id="percentBar" className="h-2 w-full bg-red-700">
					<div className="mr-2 h-full bg-green-200 px-2" style={{ width: entry.uptime + '%' }}></div>
				</div>
				<p className="text-sm">
					{entry.uptime.toFixed(2)}% since {getSince(entry.uptimeTrackingStart)}
				</p>
			</td>
			<td>
				<div className="flex flex-row">
					<a href={entry.repo}>
						<div className="max-w-min rounded-full bg-primary-100 p-1 hover:bg-opacity-0">
							<BsGithub aria-label="github repository" />
						</div>
					</a>
					<a href={entry.url}>
						<div className="ml-2 max-w-min rounded-full bg-primary-100 p-1 hover:bg-opacity-0">
							<BiLink aria-label="endpoint" />
						</div>
					</a>
				</div>
			</td>
		</tr>
	);
};

export default Status;
