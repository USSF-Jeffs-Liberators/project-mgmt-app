import React, { useReducer, useEffect } from "react";

class FinancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: 2,
      project: {},
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `http://localhost:3001/projects/${this.state.project_id}`
    );
    const json = await response.json();
    this.setState({ project: json[0] });
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            alert(JSON.stringify(this.state.project));
          }}
        >
          Check
        </button>
      </div>
    );
  }
}

export default FinancePage;
