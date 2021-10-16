import "./App.css";
import React, { Component } from "react";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import MyTable from "./MyTable";

class App extends Component {
  state = {
    data: [],
    syslog: "",
    syslogerr: "",
  };

  componentDidMount() {
    axios.get("https://ucapphealth.com").then((response) => {
      //  {
      // 		"id": 21,
      // 		"title": "test app",
      // 		"url": "https://pawnle.utahcounty.gov/app/api/healthcheck/bad/endpoint",
      // 		"notes": null,
      // 		"repo": null,
      // 		"statusCode": 404,
      // 		"error": "Request failed with status code 404"
      // },
      response.data.data.map((entry) => {
        entry.status = entry.status === null ? "GOOD" : "FAILURE";
        if (entry.error === "30 second response time") entry.status = "WARNING";
        return entry;
      });

      this.setState({
        data: response.data.data,
        syslog: response.data.syslog,
        syslogerr: response.data.syslogerr,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>UC App Health</h1>
        <MyTable data={this.state.data} />
        <p>
          <a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues">
            <BsGithub /> Report an Issue
          </a>
        </p>
      </div>
    );
  }
}

export default App;
