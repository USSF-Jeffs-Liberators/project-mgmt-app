import React, { useReducer, useEffect } from "react";

class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectData: [],
    };
  }

  async componentDidMount() {
    const dbResponse = await fetch(`http://localhost:3001/projects`);
    const json = await dbResponse.json();
    this.setState({
      ...this.state,
      projectData: JSON,
    });
  }

  render() {
    return (
      <div>
        <header>
          <h1> This is from create-project-page.component.js! </h1>
        </header>
        <ul>
          <li>Be able to assign developers to work on a project.</li>
          <li>
            Display a list of all developers, along with their availability
            status and when they will be available so that they can be added to
            the project team.
          </li>
          <li>Add a deadline and any required milestones.</li>
          <li>Be able to set a budget.</li>
          <li>Be able to specify the project requirements.</li>
          <li>
            Be able to assign a project manager to work on this new project.
          </li>
          <li>
            Display a list of all project managers, along with their
            availability status and when they will be available.
          </li>
        </ul>
      </div>
    );
  }
}

export default CreateProjectPage;

//http://localhost:8080/create-project-page
