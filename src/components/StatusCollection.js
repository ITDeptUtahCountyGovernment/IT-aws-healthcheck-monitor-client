import { useState } from 'react';
import Status from './Status';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';

const StatusCollection = props => {
	const displayData = props.data;
	const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });

	const sortedData = () => {
		if (sortConfig) {
			displayData.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === 'ascending' ? 1 : -1;
				}
				return 0;
			});
		}
		return displayData;
	};

	const requestSort = key => {
		let direction = 'ascending';
		if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key: key, direction: direction });
	};

	const getArrow = key => {
		if (sortConfig.key === key) {
			return sortConfig.direction === 'ascending' ? <FaLongArrowAltDown className="mx-1 inline" /> : <FaLongArrowAltUp className="mx-1 inline" />;
		}
	};

	return (
		<table className="w-full text-left text-xs text-gray-400 md:text-base">
			<thead className="bg-slate-800 text-xs uppercase text-gray-200 ">
				<tr>
					<th onClick={() => requestSort('status')} scope="col" className="cursor-pointer">
						Status {getArrow('status')}
					</th>
					<th onClick={() => requestSort('title')} scope="col" className=" cursor-pointer">
						Apps ({props.data.length}) {getArrow('title')}
					</th>
					<th onClick={() => requestSort('classification')} scope="col" className=" cursor-pointer">
						Class {getArrow('classification')}
					</th>
					{props.showTeam && (
						<th onClick={() => requestSort('name')} className=" cursor-pointer">
							Team {getArrow('name')}
						</th>
					)}
					<th scope="col" onClick={() => requestSort('uptime')} className=" cursor-pointer">
						Uptime {getArrow('uptime')}
					</th>
					<th scope="col">Links</th>
				</tr>
			</thead>
			{sortedData().map(entry => {
				return <Status entry={entry} key={entry.id} showTeam={props.showTeam} />;
			})}
		</table>
	);
};

export default StatusCollection;
