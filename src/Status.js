import React from "react";
import "./Status.css";
import { BsGithub } from "react-icons/bs";

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
        return (
          <div key={entry.id}>
            <p>
              <span className="title">{getStatusIcon(entry.status)} </span>
              <span className="title">{getTitleLink(entry)} </span>
              <span>{getRepoLink(entry.repo)}</span>
              <span>{entry.notes} </span>
              <span>{entry.statusCode} </span>
              <span>{entry.error} </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Status;
