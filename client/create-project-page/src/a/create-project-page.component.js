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
      currentInput: {},
    };
  }

  //fetches users by type, sets state
  async fetchUsers(type) {
    var res = await fetch("http://localhost:3001/users/availability/" + type);
    var json = await res.json();
    switch (type) {
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
    this.setState({currentInput: {[event.target.name]: event.target.value}});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.currentInput[0].value);
    event.preventDefault();
  }

  // handleChange = (event) => {
  //   if (!event.target.value){
  //     return;
  //   }
  //   this.setState({ 
  //     ...this.state,
  //     [event.target.name]: event.target.value });
  // };

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
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}/>
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
