import React, { useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { months } from '../utils/utils.js';
import './Status.css';
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const Status = props => {
	const [entry, setEntry] = useState(props.entry);
	const [showDetails, setShowDetails] = useState(false);

	const getStatusIcon = () => {
		if (entry.status === 'GOOD') {
			return '🟢';
		} else if (entry.status === 'WARNING') {
			return '⚠️';
		} else if (entry.status === 'FAILURE') {
			return '⛔️';
		}
	};

	const getSince = uptime => {
		const since = new Date(Math.max(Date.now() - ONE_YEAR_MS, uptime));
		return `${months[since.getMonth()]} ${since.getDate()} ${since.getFullYear()}`;
	};

	if (showDetails) {
		// more detailed view
		return (
			<div>
				<p
					onClick={() => {
						setShowDetails(false);
					}}>
					<span className="title">
						<span>{getStatusIcon()}</span> <span>{entry.title}</span>
					</span>
					<span>{entry.statusCode} </span>
					<span>{entry.error} </span>
				</p>
				<div className="details">
					<ul>
						<li>
							{entry.uptime}% uptime <span className="small-text">(since {getSince(entry.uptimeTrackingStart)})</span>
						</li>
						<li>
							{entry.name} - {entry.lead}
							(x{entry.ext}) <a href="mailto:{this.state.entry.email}">{entry.email}</a>
						</li>
						<li>
							View the repo on{' '}
							<a href={entry.repo}>
								GitHub <BsGithub className="small-icon" />
							</a>
							.
						</li>
						<li>
							See the targeted endpoint <a href={entry.url}>here</a>.
						</li>
						{entry.notes ? <li>Extra notes: {entry.notes}</li> : <></>}
					</ul>
				</div>
			</div>
		);
	} else {
		// less detailed view
		return (
			<div>
				<p
					onClick={() => {
						setShowDetails(true);
					}}>
					<span className="title">
						<span>{getStatusIcon()}</span> <span>{entry.title}</span>
					</span>
					<span>{entry.statusCode} </span>
					<span>{entry.error} </span>
				</p>
			</div>
		);
	}
};

export default Status;
