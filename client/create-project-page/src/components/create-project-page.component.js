import React from "react";
import Form from "./Form";
import UserList from "./UserList";

class CreateProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      developerList: [],
      pmList: [],
      gmList: [],
      currentInput: {
        value: "",
      },
      formData: [],
    };
  }

  //fetches users by role, sets state
  async fetchUsers(role) {
    var res = await fetch("http://localhost:3001/users/projects/" + role);
    var json = await res.json();
    switch (role) {
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
      case "General Manager":
        this.setState({
          ...this.state,
          gmList: json,
        });
      default:
        this.setState({
          ...this.state,
        });
    }
  }

  async componentDidMount() {
    this.fetchUsers("Developer");
    this.fetchUsers("Project Manager");
    this.fetchUsers("General Manager");
  }

  handleChange(event) {
    if (!event.target.value) {
      return;
    }
    let val = event.target.value;
    this.setState({
      currentInput: { value: val },
    });
    console.log(this.state.currentInput.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.currentInput.value.length === 0 ||
      this.state.currentInput.value === null
    ) {
      return;
    }
    this.setState({
      formData: this.state.formData.concat(this.state.currentInput),
      currentInput: { value: "" },
    });
    alert("Your favorite flavor is: " + JSON.stringify(this.state.formData));
  }
  // handleSubmit = (event) => {
  //   alert("A form was submitted: " + this.state.event.target);

  //   // fetch("https://your-node-server-here.com/api/endpoint", {
  //   //   method: "POST",
  //   //   // We convert the React state to JSON and send it as the POST body
  //   //   body: JSON.stringify(this.state.event.target.value),
  //   // }).then(function (response) {
  //   //   console.log(response);
  //   //   return response.json();
  //   // });

  //   event.preventDefault();
  // };

  render() {
    return (
      <div>
        <header />
        <UserList
          developers={this.state.developerList}
          projectManagers={this.state.pmList}
          generalManagers={this.state.gmList}
        />
        <Form
          value={this.state.currentInput.value}
          formData={this.state.formData}
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
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


//going to run a test from this point, this is a working copy point, if you need to rebase, do it from here...
