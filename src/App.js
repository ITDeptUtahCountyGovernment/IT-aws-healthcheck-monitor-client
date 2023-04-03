import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { BiSearch } from 'react-icons/bi';
import { MdArrowForwardIos } from 'react-icons/md';
import axios from 'axios';

import StatusCollection from './components/StatusCollection';
import Syslog from './components/Syslog';
import NavMenu from './components/NavMenu';
import ContactPopover from './components/ContactPopover';
import SideBar from './components/SideBar';
import DonutCharts from './components/DonutCharts';

// TODO: Replace with dynamic call
const TEAMS = [
	{
		id: 1,
		name: 'Green Team',
		lead: 'Avery Green',
		ext: '8455',
		email: 'averyg@utahcounty.gov',
	},
	{
		id: 2,
		name: 'Blue Team',
		lead: 'Matt Bailey',
		ext: '8454',
		email: 'matt@utahcounty.gov',
	},
	{
		id: 3,
		name: 'Gold Team',
		lead: 'Nate Wilson',
		ext: '8464',
		email: 'nathanielw@utahcounty.gov',
	},
	{
		id: 4,
		name: 'Red Team',
		lead: 'Jaren Flaker',
		ext: '8465',
		email: 'jaren@utahcounty.gov',
	},
];

const App = () => {
	const { tab } = useParams();

	const [teams, setTeams] = useState([]);
	const [data, setData] = useState([]);
	const [syslog, setSyslog] = useState('');
	const [syslogerr, setSyslogerr] = useState('');
	const [teamstats, setTeamstats] = useState({});
	const [searchInput, setSearchInput] = useState(null);

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
			if (response.data.teams) {
				setTeams(response.data.teams);
			} else {
				setTeams(TEAMS);
			}
		});
	}, [teams]);

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

	const getAllTeamsStat = () => {
		let stat = {
			GOOD: 0,
			FAILURE: 0,
			WARNING: 0,
		};
		data.forEach(entry => {
			stat[entry.status] += 1;
		});
		return stat;
	};

	const searchApp = e => {
		setSearchInput(e.target.value);
	};

	const getFilteredData = keyword => {
		return data.filter(entry => entry.title.toLowerCase().includes(keyword));
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
		if (searchInput && searchInput.length > 1) {
			return (
				<div className="flex h-80v w-full  flex-col">
					<div className="scrollbar-hide block w-full overflow-scroll rounded-lg border border-slate-800">
						<StatusCollection data={getFilteredData(searchInput)} showTeam={true} />
					</div>
				</div>
			);
		}
		if (currentNav === 'System Log') {
			console.log('syslog: ' + JSON.stringify(syslog));
			return (
				<div className="flex w-full flex-col">
					<Syslog syslog={syslog} syslogerr={syslogerr} />
				</div>
			);
		}
		if (currentNav === 'All Apps') {
			return (
				<div className="flex h-full w-full  flex-col space-y-6 lg:space-y-10 ">
					{teamstats && <DonutCharts teamstats={getAllTeamsStat()} />}
					<div className="scrollbar-hide block w-full overflow-scroll rounded-lg border  border-slate-800">
						<StatusCollection data={data} showTeam={true} />
					</div>
				</div>
			);
		}
		if (teams.some(team => team.name === currentNav)) {
			return (
				<div className="flex h-full w-full  flex-col space-y-6 lg:space-y-10">
					{teamstats[currentNav] && <DonutCharts teamstats={teamstats[currentNav]} />}
					<div className="scrollbar-hide block w-full overflow-scroll rounded-lg border border-slate-800">
						<StatusCollection data={data.filter(entry => entry.name === currentNav)} />
					</div>
				</div>
			);
		}
	};

	return (
		<div className="container mx-auto mt-20 h-screen p-6 ">
			<div className="fixed left-0 top-0 z-10 w-full border-b bg-slate-900 md:flex-row ">
				<div className={`${searchInput === 's' && 'w-full flex-col'} container mx-auto flex items-baseline justify-between space-y-3 p-6 md:flex-row md:space-y-0 `}>
					<h2>
						<NavMenu teams={teams} teamstats={teamstats} label="UC App Health" />
						<MdArrowForwardIos className="mx-4 inline" />
						{teams.some(team => team.name === getCurrentNav()) ? <ContactPopover team={teams.find(team => team.name === getCurrentNav())} /> : getCurrentNav()}
					</h2>
					<div className="inline-flex items-center rounded-full border-2 border-slate-500 bg-slate-700 px-2 py-1 md:w-80 ">
						<BiSearch onClick={() => (searchInput === 's' ? setSearchInput('') : setSearchInput('s'))} className="mx-1 fill-slate-500" />
						<input className={`${searchInput !== 's' && 'hidden '} md:inline`} name="searchBar" onChange={searchApp} value={searchInput} />
					</div>
				</div>
			</div>
			<div className="mt-6 flex w-full flex-row justify-between">
				<SideBar teamstats={teamstats} currentNav={getCurrentNav()} teams={teams} />
				<div className="flex w-full flex-col lg:w-3/4">{getDetailPanel()}</div>
			</div>
		</div>
	);
};

export default App;
