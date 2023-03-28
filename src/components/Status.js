import React, { Component } from "react";
import { BsGithub } from "react-icons/bs";
import { months } from "../utils/utils.js";
import "./Status.css";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

class Status extends Component {
  state = {
    entry: {},
    showDetails: false,
  };

  componentDidMount() {
    this.setState({
      entry: this.props.entry,
      showDetails: this.props.showDetails,
    });
  }

  getStatusIcon() {
    if (this.state.entry.status === "GOOD") {
      return "🟢";
    } else if (this.state.entry.status === "WARNING") {
      return "⚠️";
    } else if (this.state.entry.status === "FAILURE") {
      return "⛔️";
    }
  }

  getSince(uptime) {
    let since;
    if (uptime > Date.now() - ONE_YEAR_MS) {
      since = new Date(uptime);
    } else {
      since = new Date(Date.now() - ONE_YEAR_MS);
    }
    since = `${
      months[since.getMonth()]
    } ${since.getDate()} ${since.getFullYear()}`;
    return since;
  }

  render() {
    let extraNotes = <></>;
    if (this.state.entry.notes) {
      extraNotes = <li>Extra notes: {this.state.entry.notes}</li>;
    }
    if (this.state.showDetails) {
      // more detailed view
      return (
        <div>
          <p
            onClick={() => {
              this.setState({ showDetails: false });
            }}
          >
            <span className="title">
              <span>{this.getStatusIcon()}</span>{" "}
              <span>{this.state.entry.title}</span>
            </span>
            <span>{this.state.entry.statusCode} </span>
            <span>{this.state.entry.error} </span>
          </p>
          <div className="details">
            <ul>
              <li>
                {this.state.entry.uptime.toFixed(3)}% uptime{" "}
                <span className="small-text">
                  (since {this.getSince(this.state.entry.uptimeTrackingStart)})
                </span>
              </li>
              <li>
                {this.state.entry.name} - {this.state.entry.lead}
                (x{this.state.entry.ext}){" "}
                <a href="mailto:{this.state.entry.email}">
                  {this.state.entry.email}
                </a>
              </li>
              <li>
                View the repo on{" "}
                <a href={this.state.entry.repo}>
                  GitHub <BsGithub className="small-icon" />
                </a>
                .
              </li>
              <li>
                See the targeted endpoint{" "}
                <a href={this.state.entry.url}>here</a>.
              </li>
              {extraNotes}
            </ul>
          </div>
        </div>
      );
    } else {
      // less detailed view
      return (
        <div>
          <p
            onClick={() => {
              this.setState({ showDetails: true });
            }}
          >
            <span className="title">
              <span>{this.getStatusIcon()}</span>{" "}
              <span>{this.state.entry.title}</span>
            </span>
            <span>{this.state.entry.statusCode} </span>
            <span>{this.state.entry.error} </span>
          </p>
        </div>
      );
    }
  }
}

export default Status;
