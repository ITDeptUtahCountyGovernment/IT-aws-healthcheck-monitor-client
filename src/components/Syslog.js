import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';

const Syslog = props => {
	return (
		<div className="w-full text-xs ">
			<div>
				<h2>Stdout</h2>
				<CodeBlock
					text={props.syslog}
					language="bash"
					theme={dracula}
					className="p-4"
					customStyle={{
						height: '300px',
						overflow: 'scroll',
					}}
				/>
			</div>
			<div>
				<h2>Stderr</h2>
				<CodeBlock
					text={props.syslogerr}
					language="bash"
					theme={dracula}
					customStyle={{
						height: '300px',
						overflow: 'scroll',
					}}
				/>
			</div>
		</div>
	);
};

export default Syslog;
