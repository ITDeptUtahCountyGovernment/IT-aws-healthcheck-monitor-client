import { BsGithub, BsFillDatabaseFill } from 'react-icons/bs';
import { RiNotificationFill, RiTeamFill } from 'react-icons/ri';
import { HiDocumentText } from 'react-icons/hi';
import { MdDeveloperMode } from 'react-icons/md';

const SideBar = props => {
	return (
		<ul className="hidden h-full w-max flex-col lg:flex lg:w-1/5">
			<a href="/">
				<li className={`sidebarTab rounded-lg ${!(props.currentNav === 'System Log') && 'bg-slate-700 text-gray-200'}`}>
					<h3>
						<RiTeamFill className="mr-2 inline" aria-hidden="true" />
						All Teams
					</h3>
				</li>
			</a>
			<li className="pt-0">
				<ul className="border-l">
					{props.teams.map((team, index) => (
						<a href={`/${team.name.replace(/\s+/g, '-')}`}>
							<li key={index} className={`sidebarTab ${props.currentNav === team.name && 'bg-slate-800 text-gray-200'}`}>
								{team.name}
								{props.teamstats[team.name] && props.teamstats[team.name].GOOD > 0 && <span className="ml-2 max-w-min rounded-full bg-good px-2 font-bold text-black ">{props.teamstats[team.name].GOOD}</span>}
								{props.teamstats[team.name] && props.teamstats[team.name].WARNING > 0 && <span className="ml-2 max-w-min rounded-full bg-warning px-2 font-bold text-black ">{props.teamstats[team.name].WARNING}</span>}
								{props.teamstats[team.name] && props.teamstats[team.name].FAILURE > 0 && <span className="ml-2 max-w-min rounded-full bg-failure px-2 font-bold text-black ">{props.teamstats[team.name].FAILURE}</span>}
							</li>
						</a>
					))}
				</ul>
			</li>
			<a href="/system-log">
				<li className={`sidebarTab rounded-lg ${props.currentNav === 'System Log' && 'bg-slate-700 text-gray-200'}`}>
					<h3 className={props.currentNav === 'System Log' && 'text-gray-200'}>
						<HiDocumentText className="mr-2 inline" aria-hidden="true" />
						System Log
					</h3>
				</li>
			</a>
			<hr></hr>
			<li>
				<h3>
					<MdDeveloperMode className="mr-2 inline" aria-hidden="true" />
					Developer Links
				</h3>
			</li>
			<li className="pt-0">
				<ul className="border-l">
					<li className="min-w-max">
						<a href={`mailto:${'nathanielw@utahcounty.gov'}`}>
							<RiNotificationFill className="mr-2 inline" aria-hidden="true" />
							Request Notifications
						</a>
					</li>
					<li className="min-w-max">
						<a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues">
							<BsGithub className="mr-2 inline" aria-hidden="true" />
							Report any issues
						</a>
					</li>
					<li className="min-w-max">
						<a href="http://ucapphealth.com/db.sqlite">
							<BsFillDatabaseFill className="mr-2 inline" aria-hidden="true" />
							Download db.sqlite
						</a>
					</li>
				</ul>
			</li>
		</ul>
	);
};
export default SideBar;
