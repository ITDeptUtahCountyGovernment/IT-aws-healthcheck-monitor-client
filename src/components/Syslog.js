import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

const Syslog = props => {
	return (
		<div>
			<h2>Stdout</h2>
			<CodeBlock
				text={props.syslog}
				language="bash"
				theme={dracula}
				customStyle={{
					height: '150px',
					overflow: 'scroll',
				}}
			/>
			<h2>Stderr</h2>
			<CodeBlock
				text={props.syslogerr}
				language="bash"
				theme={dracula}
				customStyle={{
					height: '150px',
					overflow: 'scroll',
				}}
			/>
		</div>
	);
};

export default Syslog;
