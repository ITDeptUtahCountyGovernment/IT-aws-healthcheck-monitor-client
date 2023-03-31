import { Menu } from '@headlessui/react';
import { BsGithub } from 'react-icons/bs';
const NavMenu = props => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<p>
				<Menu.Button>
					<h2 className="hover:text-primary-500">{props.label}</h2>
				</Menu.Button>
			</p>

			<Menu.Items className="menuItems border-2 border-slate-400">
				<Menu.Item>
					<button onClick={() => props.onTeamChange(-1)} className="menuItem font-semibold ">
						All Teams
					</button>
				</Menu.Item>
				{props.teams.map((team, index) => {
					return (
						<Menu.Item>
							{({ active }) => (
								<button onClick={() => props.onTeamChange(index)} className="menuItem">
									{team.name}
								</button>
							)}
						</Menu.Item>
					);
				})}
				<Menu.Item>
					<button onClick={() => props.onTeamChange(-2)} className="menuItem font-semibold ">
						System Log
					</button>
				</Menu.Item>
				<hr></hr>
				<hr></hr>
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
