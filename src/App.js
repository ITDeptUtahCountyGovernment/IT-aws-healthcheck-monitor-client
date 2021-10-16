import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import MyTable from './MyTable';

class App extends Component {
	state = {
		data: [],
		syslog: '',
		syslogerr: '',
	};

	componentDidMount() {
		axios.get('https://ucapphealth.com').then(response => {
			//  {
			// 		"id": 21,
			// 		"title": "test app",
			// 		"url": "https://pawnle.utahcounty.gov/app/api/healthcheck/bad/endpoint",
			// 		"notes": null,
			// 		"repo": null,
			// 		"statusCode": 404,
			// 		"error": "Request failed with status code 404"
			// },
			response.data.data.map(entry => {
				entry.status = entry.status === null ? 'GOOD' : 'FAILURE';
				if (entry.error === '30 second response time') entry.status = 'WARNING';
				return entry;
			});

			this.setState({
				data: response.data.data,
				syslog: response.data.syslog, //.split('\n'),
				syslogerr: response.data.syslogerr, //.split('\n'),
			});
		});
	}

	render() {
		return <MyTable data={this.state.data} />;
	}
}

export default App;
