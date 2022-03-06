import React, { Component } from "react";
// import Highlight from "react-highlight.js";

class CodeBlock extends Component {
  state = {
    content: "",
    title: "",
  };

  componentDidMount() {
    this.setState({
      content: this.props.content,
      title: this.props.title,
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <pre>
          <code>{this.state.content}</code>
        </pre>
      </div>
    );
  }
}

export default CodeBlock;
