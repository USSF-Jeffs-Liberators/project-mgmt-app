import Gantt from "./Gantt";
import React from "react";
import { gantt } from "dhtmlx-gantt";

var data = {};

class GanttChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: 2,
      tasks: [],
      dependencies: [],
      users: [],
      teamMembers: [],
      projectExpenses: [],
      taskFlag: false,
      linksFlag: false
    };
  }
  
  async componentDidMount() {
    this.setEvents()
    this.fetchData();
  }

  setEvents() {
    gantt.attachEvent("onAfterTaskAdd", async (id, item) => {
      var taskData = {};
      taskData.project_id = this.state.project_id;
      taskData.assigned_to = null;
      taskData.task_name = item.text;
      taskData.start_date = this.parseTaskDate(item.start_date);
      taskData.duration = item.duration;
      taskData.progress = item.progress;

      await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      this.fetchData();
    });

    gantt.attachEvent("onAfterTaskUpdate", async (id, item) => {
      var taskData = {};
      taskData.assigned_to = this.getUserID(item.resource);
      taskData.task_name = item.text;
      taskData.start_date = this.parseTaskDate(item.start_date);
      taskData.duration = item.duration;
      taskData.progress = item.progress;

      await fetch(`http://localhost:3001/tasks/${id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
      await this.fetchData()
      this.updateLaborExpense(this.getUserID(item.resource))
    });

    gantt.attachEvent("onAfterTaskDelete", async (id, item) => {
      await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });
      await this.fetchData();
      this.updateLaborExpense(this.getUserID(item.resource))
    });

    gantt.attachEvent("onAfterLinkAdd", async (id, item) => {
      var linkData = {};
      linkData.project_id = this.state.project_id;
      linkData.source_task = item.source;
      linkData.target_task = item.target;

      await fetch("http://localhost:3001/dependencies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(linkData),
      });
      this.fetchData();
    });

    gantt.attachEvent("onAfterLinkDelete", async (id, item) => {
      await fetch(`http://localhost:3001/dependencies/${id}`, {
        method: "DELETE",
      });
      this.fetchData();
    });
  }


  async updateLaborExpense(userID) {
    let numWorkDays = 0
    for (let i = 0; i < this.state.tasks.length; i++) {
      if (this.state.tasks[i].assigned_to === userID) {
        numWorkDays += this.state.tasks[i].duration
      }
    }
    let dailyRate = 0;
    for (let i = 0; i < this.state.teamMembers.length; i++) {
      if (this.state.teamMembers[i].user_id === userID) {
        dailyRate = this.state.teamMembers[i].daily_rate
      }
    }

    var laborExpense = {};
    laborExpense.expense_amount = (numWorkDays * dailyRate)
    laborExpense.project_id = this.state.project_id
    laborExpense.employee = userID

    await fetch(
      `http://localhost:3001/update-labor-expense`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(laborExpense),
      }
    );
    this.updateCurrentCost()
  }

  async updateCurrentCost() {

    await this.getExpenses()

    var newCurrentCost = 0
    for (let i = 0; i < this.state.projectExpenses.length; i++) {
      newCurrentCost += parseFloat(this.state.projectExpenses[i].expense_amount)
    }

    await fetch(
      `http://localhost:3001/projects/${this.state.project_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ current_cost: newCurrentCost }),
      }
    );
  }

  async fetchData() {
    const response1 = await fetch(
      `http://localhost:3001/projects/${this.state.project_id}/tasks/`
    );
    const json1 = await response1.json();
    this.setState({ tasks: json1 });

    const response2 = await fetch(
      `http://localhost:3001/projects/${this.state.project_id}/dependencies/`
    );
    const json2 = await response2.json();
    this.setState({ dependencies: json2 });

    const response3 = await fetch(`http://localhost:3001/users`);
    const json3 = await response3.json();
    this.setState({ users: json3 });

    const response4 = await fetch(`http://localhost:3001/projects/${this.state.project_id}/team`)
    const json4 = await response4.json();
    this.setState({ teamMembers: json4 });

    await this.setTaskData();
    await this.setLinkData();

    let currentScrollState = gantt.getScrollState().x;
    await gantt.clearAll();
    await gantt.parse(data);
    gantt.scrollTo(currentScrollState, null);
  }

  async getExpenses() {
    const response = await fetch(
      `http://localhost:3001/projects/${this.state.project_id}/expenses`
    );
    const json = await response.json();
    this.setState({ projectExpenses: json });
  }

  setTaskData() {
    var taskArray = [];
    var tasks = this.state.tasks;
    for (var i = 0; i < tasks.length; i++) {
      var obj = {};
      obj.id = tasks[i].task_id;
      obj.text = tasks[i].task_name;
      obj.start_date = this.parseDatabaseDate(tasks[i].start_date);
      obj.duration = tasks[i].duration;
      obj.progress = tasks[i].progress;
      obj.resource = this.getResource(tasks[i].assigned_to);
      taskArray.push(obj);
    }
    data.data = taskArray;
    this.setState({ taskFlag: true });
  }

  setLinkData() {
    var linkArray = [];
    var links = this.state.dependencies;
    for (var i = 0; i < links.length; i++) {
      var obj = {};
      obj.id = links[i].dependency_id;
      obj.source = links[i].source_task;
      obj.target = links[i].target_task;
      obj.type = "0";
      linkArray.push(obj);
    }
    data.links = linkArray;
    this.setState({ linksFlag: true });
  }

  parseDatabaseDate(databaseDate) {
    var date = new Date(databaseDate);
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  }

  parseTaskDate(taskDate) {
    var date = new Date(taskDate);
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }

  getResource(user_id) {
    for (var i = 0; i < this.state.users.length; i++) {
      if (user_id === this.state.users[i].user_id) {
        return this.state.users[i].first_name;
      }
    }
  }

  getUserID(resource) {
    if (resource === undefined) {
      return null;
    } else {
      for (var i = 0; i < this.state.users.length; i++) {
        if (
          this.state.users[i].first_name.toUpperCase() ===
          resource.toUpperCase()
        ) {
          return this.state.users[i].user_id;
        }
      }
      alert(resource + " is not a member of this project team.");
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.state.taskFlag && this.state.linksFlag ? (
          <div className="gantt-container">
            <Gantt 
            tasks={data}
             />
          </div>
        ) : null}
      </div>
    );
  }
}

export default GanttChart;
