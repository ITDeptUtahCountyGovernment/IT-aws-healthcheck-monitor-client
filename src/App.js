import './App.css';
import React, { useEffect, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import axios from 'axios';
import StatusCollection from './components/StatusCollection';
import Syslog from './components/Syslog';

const App = () => {
	const [data, setData] = useState([]);
	const [syslog, setSyslog] = useState('');
	const [syslogerr, setSyslogerr] = useState('');

	useEffect(() => {
		axios.get('https://ucapphealth.com').then(response => {
			response.data.data.map(entry => {
				entry.status = entry.status === null ? 'GOOD' : 'FAILURE';
				if (entry.error && entry.error.includes('timeout of 30000ms exceeded')) entry.status = 'WARNING';
				return entry;
			});

			setData(response.data.data);
			setSyslog(response.data.syslog);
			setSyslogerr(response.data.syslogerr);
		});
	});

	return (
		<div className="container">
			<h1>UC App Health</h1>
			<p>
				{' '}
				Tap an app for details and{' '}
				<a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues">
					report any issues <BsGithub className="small-icon" />
				</a>{' '}
				Download <a href="http://ucapphealth.com/db.sqlite">db.sqlite</a>
			</p>

			<StatusCollection data={data} />
			<Syslog syslog={syslog} syslogerr={syslogerr} />
		</div>
	);
};

export default App;
