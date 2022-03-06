import "./App.css";
import React, { Component } from "react";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import StatusCollection from "./components/StatusCollection";
import Syslog from "./components/Syslog";

class App extends Component {
  state = {
    data: [],
    syslog: "",
    syslogerr: "",
  };

  componentDidMount() {
    axios.get("https://ucapphealth.com").then((response) => {
      response.data.data.map((entry) => {
        entry.status = entry.status === null ? "GOOD" : "FAILURE";
        if (entry.error && entry.error.includes("timeout of 30000ms exceeded"))
          entry.status = "WARNING";
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
      <div className="container">
        <h1>UC App Health</h1>
        <p>
          {" "}
          Tap an app for details and{" "}
          <a href="https://github.com/ITDeptUtahCountyGovernment/IT-aws-healthcheck-monitor-client/issues">
            report any issues <BsGithub className="small-icon" />
          </a>
        </p>
        <StatusCollection data={this.state.data} />
        <Syslog syslog={this.state.syslog} syslogerr={this.state.syslogerr} />
      </div>
    );
  }
}

export default App;
