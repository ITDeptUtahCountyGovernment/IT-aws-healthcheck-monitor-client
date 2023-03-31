import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BsGithub } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { MdArrowForwardIos } from 'react-icons/md';
import axios from 'axios';

import StatusCollection from './components/StatusCollection';
import Syslog from './components/Syslog';
import NavMenu from './components/NavMenu';
import ContactPopover from './components/ContactPopover';

// TODO: Replace with dynamic call
const TEAMS = [
	{ name: 'Red Team', lead: 'Jaren Flaker', ext: '8465', email: 'jaren@utahcounty.gov' },
	{ name: 'Green Team', lead: 'Avery Green', ext: '8455', email: 'averyg@utahcounty.gov' },
	{ name: 'Blue Team', lead: ' Matt Bailey', ext: '8454', email: 'matt@utahcounty.gov' },
	{ name: 'Gold Team', lead: 'Nate Wilson', ext: '8464', email: 'nathanielw@utahcounty.gov' },
];

const SYSLOG = -2;
const ALL_TEAMS = -1;

const App = () => {
	const { tab } = useParams();

	const [data, setData] = useState([]);
	const [syslog, setSyslog] = useState('');
	const [syslogerr, setSyslogerr] = useState('');
	const [teamID, setTeamID] = useState(-1);
	const [teamstats, setTeamstats] = useState({});
	const [searchInput, setSearchInput] = useState(null);

	useEffect(() => {
		axios.get('http://localhost:3000').then(response => {
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
	}, [teamstats]);

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

	const searchApp = e => {
		setSearchInput(e.target.value);
	};

	const getFilteredData = keyword => {
		return data.filter(entry => entry.title.toLowerCase().includes(keyword));
	};

	const selectTeam = () => {
		if (tab === 'syslog') {
			setTeamID(SYSLOG);
		} else if (!tab) {
			setTeamID(ALL_TEAMS);
		}
	};

	const getCurrentNav = () => {
		return tab
			? tab
					.toLowerCase()
					.split('-')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ')
			: 'All Apps';
	};

	const getDetailPanel = () => {
		const currentNav = getCurrentNav();
		if (searchInput && searchInput != '') {
			return (
				<div className="flex h-80v w-full  flex-col">
					<div className="scrollbar-hide block w-full overflow-scroll rounded-lg border border-slate-800">
						<StatusCollection data={getFilteredData(searchInput)} showTeam={true} />
					</div>
				</div>
			);
		}
		if (currentNav === 'System Log') {
			return (
				<div className="flex w-full flex-col">
					<Syslog syslog={syslog} syslogerr={syslogerr} />
				</div>
			);
		}
		if (currentNav === 'All Apps') {
			return (
				<div className="flex h-full w-full  flex-col">
					<div className="scrollbar-hide block w-full overflow-scroll rounded-lg border  border-slate-800">
						<StatusCollection data={data} showTeam={true} />
					</div>
				</div>
			);
		}
		if (TEAMS.some(team => team.name === currentNav)) {
			return (
				<div className="flex h-full w-full  flex-col">
					<div className="scrollbar-hide block w-full overflow-scroll rounded-lg border border-slate-800">
						<StatusCollection data={data.filter(entry => entry.name === currentNav)} />
					</div>
				</div>
			);
		}
	};

	return (
		<div className="container mx-auto mt-20 h-screen p-6 ">
			<div className="fixed left-0 top-0 z-10 w-full border-b bg-slate-900">
				<div className=" container mx-auto flex flex-col items-baseline space-y-3 p-6 md:flex-row md:justify-between md:space-y-0">
					<h2>
						<NavMenu onTeamChange={selectTeam} teams={TEAMS} label="UC App Health" />
						<MdArrowForwardIos className="mx-4 inline" />
						{getCurrentNav()}
					</h2>
					<div className="mt- inline-flex w-full items-center rounded-full border-2 border-slate-500 bg-slate-700 px-2 py-1 md:w-80 ">
						<BiSearch className="mx-1 fill-slate-500" />
						<input name="searchBar" onChange={searchApp} value={searchInput} />
					</div>
				</div>
			</div>
			<div className="flex w-full flex-row justify-between">
				<ul className="hidden h-full w-max flex-col lg:flex lg:w-1/5">
					<a href="/">
						<li className={`sidebarTab rounded-lg ${teamID >= ALL_TEAMS && 'bg-slate-700 text-gray-200'}`}>
							<h3 className={teamID === ALL_TEAMS && 'text-gray-200'}>All Teams</h3>
						</li>
					</a>
					<li className="pt-0">
						<ul className="border-l">
							{TEAMS.map((team, index) => (
								<a href={`/${team.name.replace(/\s+/g, '-')}`}>
									<li onClick={() => selectTeam(index)} key={index} className={`sidebarTab ${index === teamID && 'bg-slate-800 text-gray-200'}`}>
										{team.name}
										{teamstats[team.name] && teamstats[team.name].FAILURE > 0 && <span className="mx-2 max-w-min rounded-full bg-red-500 px-2 font-bold text-black ">{teamstats[team.name].FAILURE}</span>}
										{teamstats[team.name] && teamstats[team.name].WARNING > 0 && <span className="mx-2 max-w-min rounded-full bg-yellow-500 px-2 font-bold text-black ">{teamstats[team.name].WARNING}</span>}
									</li>
								</a>
							))}
						</ul>
					</li>
					<a href="/system-log">
						<li onClick={() => setTeamID(SYSLOG)} className={`sidebarTab rounded-lg ${teamID === SYSLOG && 'bg-slate-700 text-gray-200'}`}>
							<h3 className={teamID === SYSLOG && 'text-gray-200'}>System Log</h3>
						</li>
					</a>
					<hr></hr>
					<li>
						<h3>Developer Links</h3>
					</li>
					<li className="pt-0">
						<ul className="border-l">
							<li className="min-w-max">
								<a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues">
									Report any issues <BsGithub className="inline" aria-hidden="true" />
								</a>
							</li>
							<li className="min-w-max">
								<a href="http://ucapphealth.com/db.sqlite">Download db.sqlite</a>
							</li>
						</ul>
					</li>
				</ul>

				<div className="flex w-full flex-col lg:w-3/4">{getDetailPanel()}</div>
			</div>
		</div>
	);
};

export default App;
