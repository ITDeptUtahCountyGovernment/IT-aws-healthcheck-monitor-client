import React from "react";
import { CodeBlock, dracula } from "react-code-blocks";

const Syslog = (props) => {
  const stdout = props.syslog.join("\n");
  const stderr = props.syslogerr.join("\n");
  return (
    <div className="w-full text-xs ">
      <div>
        <h2 className="mb-2 mt-4">Stdout</h2>
        <CodeBlock
          text={stdout}
          language="text"
          theme={dracula}
          customStyle={{
            height: "300px",
            overflow: "scroll",
          }}
        />
      </div>
      <div>
        <h2 className="mb-2 mt-8">Stderr</h2>
        <CodeBlock
          text={stderr}
          language="bash"
          theme={dracula}
          customStyle={{
            height: "300px",
            overflow: "scroll",
          }}
        />
      </div>
    </div>
  );
};

export default Syslog;
