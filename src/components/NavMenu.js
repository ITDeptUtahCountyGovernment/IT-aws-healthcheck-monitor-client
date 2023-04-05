import { Menu } from '@headlessui/react';
import { BsGithub } from 'react-icons/bs';
import { MdHealthAndSafety } from 'react-icons/md';
const NavMenu = props => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<Menu.Button className=" hover:text-primary-500">
				<MdHealthAndSafety className="mr-2 inline" />
				{props.label}
			</Menu.Button>

			<Menu.Items className="menuItems border-2 border-slate-400">
				<Menu.Item>
					<a href="/">
						<button className="menuItem font-semibold ">All Teams</button>
					</a>
				</Menu.Item>
				{props.teams.map(team => {
					return (
						<Menu.Item>
							<button className="menuItem">
								<a href={`/${team.name.replace(/\s+/g, '-')}`}>
									{team.name}
									{props.teamstats[team.name] && props.teamstats[team.name].FAILURE > 0 && <span className="mx-2 max-w-min rounded-full bg-red-500 px-2 font-bold text-black ">{props.teamstats[team.name].FAILURE}</span>}
									{props.teamstats[team.name] && props.teamstats[team.name].WARNING > 0 && <span className="mx-2 max-w-min rounded-full bg-yellow-500 px-2 font-bold text-black ">{props.teamstats[team.name].WARNING}</span>}
								</a>
							</button>
						</Menu.Item>
					);
				})}
				<Menu.Item>
					<a href="/system-log">
						<button className="menuItem font-semibold ">System Log</button>
					</a>
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
	);
};

export default NavMenu;
