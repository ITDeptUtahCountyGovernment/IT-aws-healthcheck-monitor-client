import React, { useEffect, useState } from 'react';
import { BsGithub } from 'react-icons/bs';
import { BiMenu } from 'react-icons/bi';
import axios from 'axios';
import StatusCollection from './components/StatusCollection';
import Syslog from './components/Syslog';
import { Menu } from '@headlessui/react';

// TODO: Replace with dynamic call
const TEAMS = [
	{ name: 'Red Team', lead: 'Jaren Flaker', ext: '8465', email: 'jaren@utahcounty.gov' },
	{ name: 'Green Team', lead: 'Avery Green', ext: '8455', email: 'averyg@utahcounty.gov' },
	{ name: 'Blue Team', lead: ' Matt Bailey', ext: '8454', email: 'matt@utahcounty.gov' },
	{ name: 'Gold Team', lead: 'Nate Wilson', ext: '8464', email: 'nathanielw@utahcounty.gov' },
];

const App = () => {
	const [data, setData] = useState([]);
	const [syslog, setSyslog] = useState('');
	const [syslogerr, setSyslogerr] = useState('');
	const [teamID, setTeamID] = useState(0);
	const [teamstats, setTeamstats] = useState({});

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
			updateTeamStat();
		});
	}, [teamID]);

	const updateTeamStat = () => {
		let newTeamStats = {};
		data.forEach(entry => {
			if (!newTeamStats[entry.name]) {
				newTeamStats[entry.name] = {
					GOOD: 0,
					FAILURE: 0,
					WARNING: 0,
				};
			}
			newTeamStats[entry.name][entry.status] += 1;
		});
		setTeamstats(newTeamStats);
	};

	const selectTeam = index => {
		setTeamID(index);
	};

	return (
		<div className="container mx-auto p-6">
			<div className="flex flex-row items-baseline justify-between">
				<h2>UC App Health</h2>
				{
					<Menu as="div" className="relative inline-block pl-6 text-left lg:hidden">
						<p>
							<Menu.Button className="hover:text-primary-600">
								<h2>
									<BiMenu className="mx-2 inline" aria-hidden="true" />
								</h2>
							</Menu.Button>
						</p>

						<Menu.Items className="menuItems">
							{TEAMS.map((team, index) => {
								return (
									<Menu.Item>
										{({ active }) => (
											<button onClick={() => selectTeam(index)} className={`${active && 'bg-slate-100 '} menuItem`}>
												{team.name}
												{teamstats[team.name] && teamstats[team.name].FAILURE > 0 && <span className="mx-2 max-w-min rounded-full bg-red-400 px-2 text-white">{teamstats[team.name].FAILURE}</span>}
											</button>
										)}
									</Menu.Item>
								);
							})}
							<hr></hr>
							<hr></hr>
							<Menu.Item>
								<button onClick={() => setTeamID(-1)} className="menuItem">
									System Log
								</button>
							</Menu.Item>
							<Menu.Item>
								<button className="menuItem">
									<a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues">
										Report any issues <BsGithub className="inline" aria-hidden="true" />
									</a>
								</button>
							</Menu.Item>
							<Menu.Item>
								<button className="menuItem">
									<a href="http://ucapphealth.com/db.sqlite">Download db.sqlite</a>
								</button>
							</Menu.Item>
						</Menu.Items>
					</Menu>
				}
			</div>
			<hr className="mb-8"></hr>
			<div className="flex w-full flex-row justify-between">
				<ul className="container hidden w-max flex-col lg:flex lg:w-1/5">
					<li>
						<h3 className="pb-4">Teams</h3>
						<ul className="border-l">
							{TEAMS.map((team, index) => (
								<li onClick={() => selectTeam(index)} key={index} className={`sidebarTab ${index === teamID && 'bg-slate-100'}`}>
									{team.name}
									{teamstats[team.name] && teamstats[team.name].FAILURE > 0 && <span className="mx-2 max-w-min rounded-full bg-red-400 px-2 text-white">{teamstats[team.name].FAILURE}</span>}
								</li>
							))}
						</ul>
					</li>
					<li onClick={() => setTeamID(-1)} className="sidebarTab">
						<h3>System Log</h3>
					</li>
					<hr></hr>
					<li>
						<a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues">
							Report any issues <BsGithub className="inline" aria-hidden="true" />
						</a>
					</li>
					<li>
						<a href="http://ucapphealth.com/db.sqlite">Download db.sqlite</a>
					</li>
				</ul>

				<div className="flex w-full flex-col lg:w-3/4">
					<div className="mb-2 flex w-full items-baseline justify-between">
						<h1 className="inline"> {teamID === -1 ? 'System Log' : TEAMS[teamID].name} </h1>
					</div>
					{!(teamID === -1) && (
						<p className="mb-8">
							{TEAMS[teamID].lead} (x{TEAMS[teamID].ext}) <a href="mailto:{this.state.entry.email}">{TEAMS[teamID].email}</a>
						</p>
					)}
					{teamID === -1 ? <Syslog syslog={syslog} syslogerr={syslogerr} /> : <StatusCollection data={data} team={TEAMS[teamID].name} />}
				</div>
			</div>
		</div>
	);
};

export default App;
