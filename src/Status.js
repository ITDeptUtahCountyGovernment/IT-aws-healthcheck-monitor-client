import React from "react";
import "./Status.css";
import { BsGithub } from "react-icons/bs";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getStatusIcon(status) {
  if (status === "GOOD") {
    return "🟢";
  } else if (status === "WARNING") {
    return "⚠️";
  } else if (status === "FAILURE") {
    return "⛔️";
  }
}

function getTitleLink(entry) {
  return <a href={entry.url}>{entry.title}</a>;
}

function getRepoLink(repo) {
  return (
    <a href={repo}>
      <BsGithub /> repo
    </a>
  );
}

function Status(props) {
  return (
    <div>
      {props.data.map((entry) => {
        let since;
        if (entry.uptimeTrackingStart > Date.now() - ONE_YEAR_MS) {
          since = new Date(entry.uptimeTrackingStart);
        } else {
          since = new Date(Date.now() - ONE_YEAR_MS);
        }
        since = `${
          months[since.getMonth()]
        } ${since.getDate()} ${since.getFullYear()}`;
        return (
          <div key={entry.id}>
            <p>
              <span className="title">{getStatusIcon(entry.status)} </span>
              <span className="title">{getTitleLink(entry)} </span>
              <span>{getRepoLink(entry.repo)}</span>
              <span>{entry.notes} </span>
              <span>{entry.statusCode} </span>
              <span>{entry.error} </span>
              <span style={{ fontSize: ".85em" }}>
                ({entry.uptime}% uptime since {since}){" "}
              </span>
              <span style={{ fontSize: ".65em" }}>
                (Contact: {entry.name},{" "}
              </span>
              <span style={{ fontSize: ".65em" }}>{entry.lead}) </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Status;
