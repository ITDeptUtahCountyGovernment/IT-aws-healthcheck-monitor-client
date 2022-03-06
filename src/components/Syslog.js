import React from "react";
import CodeBlock from "./CodeBlock";

function Syslog(props) {
  return (
    <div>
      <CodeBlock content={props.syslog} title="Stdout" />
      <CodeBlock content={props.syslogerr} title="Stderr" />
    </div>
  );
}

export default Syslog;
