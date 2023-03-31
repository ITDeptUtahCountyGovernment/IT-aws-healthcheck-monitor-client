import { Popover } from '@headlessui/react';

const ContactPopover = props => {
	return (
		<Popover className="relative inline">
			<Popover.Button className=" text-left hover:text-primary-500 focus:border-0 ">{props.team.name}</Popover.Button>
			<Popover.Panel className="absolute left-0 z-10">
				<div className=" rounded-b-lg rounded-r-lg border-2 border-slate-400 bg-slate-800 px-4 py-2 text-sm">
					{props.team.lead} <a href="mailto:{this.state.entry.email}">{props.team.email}</a>
				</div>
			</Popover.Panel>
		</Popover>
	);
};
export default ContactPopover;
