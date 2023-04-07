import React from 'react';
import { BsGithub, BsCheckCircleFill } from 'react-icons/bs';
import { IoIosCloseCircle, IoIosWarning } from 'react-icons/io';
import { BiLink } from 'react-icons/bi';
import { months } from '../utils/utils.js';
import ContactPopover from './ContactPopover.js';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const Status = props => {
	const entry = props.entry;

	const getStatus = () => {
		switch (entry.status) {
			case 'GOOD':
				return (
					<span className="statusPill bg-good/25 text-good">
						<BsCheckCircleFill className=" mr-1 inline-block fill-good" />
						GOOD
					</span>
				);
			case 'FAILURE':
				return (
					<span className="statusPill bg-failure/25 text-failure">
						<IoIosCloseCircle className=" mr-1 inline-block fill-failure" />
						FAILURE
					</span>
				);
			case 'WARNING':
				return (
					<span className="statusPill bg-warning/25 text-warning">
						<IoIosWarning className=" mr-1 inline-block fill-warning" />
						WARNING
					</span>
				);
			default:
				return '-';
		}
	};

	const getClassification = () => {
		if (!entry.classification) {
			return '-';
		}

		switch (entry.classification) {
			case 'unimportant':
				return <span className="statusPill">unimportant</span>;
			case 'important':
				return <span className="statusPill bg-cyan-500/25 text-cyan-400">important</span>;
			case 'critical':
				return <span className="statusPill bg-red-500/25 text-red-400">critical</span>;
		}
	};

	const getSince = uptime => {
		const since = new Date(Math.max(Date.now() - ONE_YEAR_MS, uptime));
		return `${months[since.getMonth()]} ${since.getDate()} ${since.getFullYear()}`;
	};

	return (
		<tr className="hover:bg-slate-800">
			<td>{getStatus()}</td>
			<td>{entry.title}</td>
			<td>{getClassification()}</td>
			{props.showTeam && (
				<td>
					<ContactPopover team={entry} />
				</td>
			)}
			<td>
				<div className="flex flex-col">
					<div id="percentBar" className="h-2 w-full bg-red-700">
						<div className="mr-2 h-full bg-gradient-to-r from-cyan-800 to-emerald-500 px-2" style={{ width: entry.uptime + '%' }}></div>
					</div>
					<p className="text-xs">
						{entry.uptime && entry.uptime.toFixed(2)}% <span className="hidden md:inline-block">since {getSince(entry.uptimeTrackingStart)}</span>
					</p>
				</div>
			</td>
			<td>
				<div className="flex flex-row">
					<a href={entry.repo}>
						<div className="max-w-min rounded-full bg-slate-600 p-1 hover:bg-opacity-0">
							<BsGithub aria-label="github repository" className=" fill-slate-50" />
						</div>
					</a>
					<a href={entry.url}>
						<div className="ml-2 max-w-min rounded-full bg-slate-600 p-1 hover:bg-opacity-0">
							<BiLink aria-label="endpoint" className=" fill-slate-50" />
						</div>
					</a>
				</div>
			</td>
		</tr>
	);
};

export default Status;
