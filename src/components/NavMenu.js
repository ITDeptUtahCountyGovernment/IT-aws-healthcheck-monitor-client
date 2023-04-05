import { Menu } from '@headlessui/react';
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
					<a href="/" className="block">
						<button className="menuItem font-semibold ">All Teams</button>
					</a>
				</Menu.Item>
				{props.teams.map(team => {
					return (
						<Menu.Item>
							<a href={`/${team.name.replace(/\s+/g, '-')}`} className="block">
								<button className="menuItem">
									{team.name}
									{props.teamstats[team.name] && props.teamstats[team.name].GOOD > 0 && <span className="mx-2 max-w-min rounded-full bg-emerald-500 px-2 font-bold text-black ">{props.teamstats[team.name].GOOD}</span>}
									{props.teamstats[team.name] && props.teamstats[team.name].FAILURE > 0 && <span className="mx-2 max-w-min rounded-full bg-red-500 px-2 font-bold text-black ">{props.teamstats[team.name].FAILURE}</span>}
								</button>
							</a>
						</Menu.Item>
					);
				})}
				<Menu.Item>
					<a href="/system-log" className="block">
						<button className="menuItem font-semibold ">System Log</button>
					</a>
				</Menu.Item>
				<Menu.Item>
					<a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues" className="block">
						<button className="menuItem">Report any issues</button>
					</a>
				</Menu.Item>
				<Menu.Item>
					<a href="http://ucapphealth.com/db.sqlite" className="block">
						<button className="menuItem">Download db.sqlite</button>
					</a>
				</Menu.Item>
			</Menu.Items>
		</Menu>
	);
};

export default NavMenu;
