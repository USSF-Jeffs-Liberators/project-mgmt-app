import React from "react";
import Form from "./Form";
import UserList from "./UserList";

class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      developerList: [],
      pmList: []
    };
  };

  //fetches users by type, sets state
  async fetchUsers(type) {
    var res = await fetch("http://localhost:3001/users/type/"+type);
    var json = await res.json();
    switch(type) {
      case "Developer":
        this.setState({
          ...this.state,
          developerList: json,
        });
      case "Project Manager":
        this.setState({
          ...this.state,
          pmList: json,
        });
      default:
        this.setState({
          ...this.state,
        })        
    }
    
  }

  //TODO: create fetch to POST a project

  async componentDidMount() {
    this.fetchUsers("Developer");
    this.fetchUsers("Project Manager");
  }

  render() {
    return (
      <div>
        <header>
          <h1> This is from create-project-page.component.js! </h1>
        </header>
        <UserList 
        developers={this.state.developerList}
        projectManagers={this.state.pmList}
        />
        
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