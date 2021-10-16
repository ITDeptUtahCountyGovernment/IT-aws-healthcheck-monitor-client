import React from "react";
import { BsGithub } from "react-icons/bs";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "./MyTable.css";

function MyTable(props) {
  if (!props.data || props.data.length === 0) {
    return (
      <p>
        There was no data returned from the server, this is likely an error.
      </p>
    );
  }
  return (
    <Table>
      <Thead>
        <Tr key="0">
          {Object.keys(props.data[0]).map((header) => {
            if (header !== "url" && header !== "id") {
              return <Th>{header}</Th>;
            }
            return <div></div>;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map((entry) => {
          return (
            <Tr key={entry.id}>
              {Object.keys(entry).map((column) => {
                if (column === "repo") {
                  return (
                    <Td>
                      <a href={entry[column]}>
                        <BsGithub /> repo
                      </a>
                    </Td>
                  );
                } else if (column === "status") {
                  if (entry[column] === "GOOD") {
                    return <Td>🟢</Td>;
                  } else if (entry[column] === "WARNING") {
                    return <Td>🟡</Td>;
                  } else if (entry[column] === "FAILURE") {
                    return <Td>🔴</Td>;
                  }
                } else if (column === "title") {
                  return (
                    <Td>
                      <a className="title" href={entry.url}>
                        {entry.title}
                      </a>
                    </Td>
                  );
                } else if (column === "url") {
                  return <div></div>;
                } else if (column === "id") {
                  return <div></div>;
                } else {
                  return <Td>{entry[column]}</Td>;
                }
                return <div></div>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
export default MyTable;
