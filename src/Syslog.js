import React from "react";
// import Highlight from "react-highlight.js";

function Syslog(props) {
  return (
    <div>
      <h2>Stdout</h2>
      <pre>
        <code>{props.syslog}</code>
      </pre>
      {/* <Highlight language="javascript">{props.syslog}</Highlight> */}
      <h2>Stderr</h2>
      <pre>
        <code>{props.syslogerr}</code>
      </pre>
    </div>
  );
}

export default Syslog;
