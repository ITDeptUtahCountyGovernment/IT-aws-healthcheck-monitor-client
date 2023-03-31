import React, { useState } from 'react';
import { BsGithub, BsCheckCircleFill } from 'react-icons/bs';
import { IoIosWarning, IoIosCloseCircle } from 'react-icons/io';
import { BiLink } from 'react-icons/bi';
import { months } from '../utils/utils.js';
import ContactPopover from './ContactPopover.js';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const Status = props => {
	const entry = props.entry;
	const [showDetails, setShowDetails] = useState(false);

	const getStatusIcon = () => {
		switch (entry.status) {
			case 'GOOD':
				return (
					<span className="inline-flex items-center rounded-full border-2 border-blue-500 bg-slate-800  px-2  py-1 text-xs text-blue-500">
						<BsCheckCircleFill className=" mr-1 inline-block fill-blue-500" />
						GOOD
					</span>
				);
			case 'WARNING':
				return (
					<span className="inline-flex items-center rounded-full border-2 border-yellow-500 bg-slate-800  px-2  py-1 text-xs text-yellow-500">
						<IoIosWarning className=" mr-1 inline-block fill-yellow-500" /> WARNING
					</span>
				);
			case 'FAILURE':
				return (
					<span className="inline-flex items-center rounded-full border-2 border-red-500  bg-slate-800 px-2  py-1 text-xs text-red-500">
						<IoIosCloseCircle className=" mr-1 inline-block fill-red-500" /> FAILURE
					</span>
				);
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
		<tr className="hover:bg-slate-800">
			<td>{entry.title}</td>
			<td>{getStatusIcon()}</td>
			<td>Critical</td>
			{props.showTeam && (
				<td>
					<ContactPopover team={entry} />
				</td>
			)}
			<td>
				<div className="flex flex-col">
					<div id="percentBar" className="h-2 w-full bg-red-700">
						<div className="mr-2 h-full bg-gradient-to-r from-cyan-500 to-blue-500 px-2" style={{ width: entry.uptime + '%' }}></div>
					</div>
					<p className="text-xs">
						{entry.uptime.toFixed(2)}% <span className="hidden md:inline-block">since {getSince(entry.uptimeTrackingStart)}</span>
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
