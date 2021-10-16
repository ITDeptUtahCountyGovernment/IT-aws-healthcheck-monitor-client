import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

function MyTable(props) {
	if (!props.data || props.data.length === 0) {
		return <p>There was no data returned from the server, this is likely an error.</p>;
	}
	return (
		<Table>
			<Thead>
				<Tr key="0" >
					{Object.keys(props.data[0]).map(header => {
						if (header !== 'url') {
							return <Th>{header}</Th>;
						}
						return '';
					})}
				</Tr>
			</Thead>
			<Tbody>
				{props.data.map(entry => {
					return (
						<Tr key={entry.id}>
							{Object.keys(entry).map(column => {
								if (column === 'repo') {
									return (
										<Td>
											<a href="{entry[column]}">repo</a>
										</Td>
									);
								} else if (column === 'status') {
									if (entry[column] === 'GOOD') {
										return <Td>🟢</Td>;
									} else if (entry[column] === 'WARNING') {
										return <Td>🟡</Td>;
									} else if (entry[column] === 'FAILURE') {
										return <Td>🔴</Td>;
									}
								} else if (column === 'title') {
									return (
										<Td>
											<a href="{entry.url}">{entry[column]}</a>
										</Td>
									);
								} else if (column === 'url') {
									return '';
								} else {
									return <Td>{entry[column]}</Td>;
								}
							})}
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
}
export default MyTable;
