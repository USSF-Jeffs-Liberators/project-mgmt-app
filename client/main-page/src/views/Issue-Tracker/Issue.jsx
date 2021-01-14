import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import {DisplayIssues} from "./DisplayIssues";
import { IssueModal } from "./IssueModal";
import { ResolveModal } from "./ResolveModal";

class IssueTracker extends React.Component{

  constructor(props)
  {
    super(props)
    this.state = {
      userType: JSON.parse(localStorage.getItem('user')).roles[0],
      project_id: 1,
      currentUser: JSON.parse(localStorage.getItem('user')),
      issues: [],
      matches: [],
      issuesFlag: false,
      showIssueModal: false,
      showResolveModal: false,
      selectedIssue: null,
      months: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ]
    }
  }

  async componentDidMount()
  {
    await this.getProjectID();
    await this.getAllIssues()
    this.setState({issuesFlag:true})
  }


  openIssueModal() {
    document.getElementById("issue-desc").value = "";
    document.getElementById("issue-severity").value = "";
    this.setState({showIssueModal: true})
    this.toggleElementsOff()
  }

  closeIssueModal() {
    this.setState({showIssueModal: false})
    this.toggleElementsOn()
  }

  openResolveModal(issue) {
    document.getElementById("issue-resolution").value = ""
    this.setState({selectedIssue:issue})
    this.setState({showResolveModal: true})
    this.toggleElementsOff()
  }

  closeResolveModal() {
    this.setState({selectedIssue:null})
    this.setState({showResolveModal: false})
    this.toggleElementsOn()
  }

  toggleElementsOff() {
    document.querySelector(".modal-wrapper").style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
    document.querySelectorAll(".rux-button:not(.modal-button),.modal-button:not(.rux-button)").forEach(element => element.style.display = 'none')
  }

  toggleElementsOn() {
    document.querySelector("body").style.overflow = "auto";
    document.querySelectorAll(".rux-button:not(.modal-button),.modal-button:not(.rux-button)").forEach(element => element.style.display = 'inline-flex')
  }

  formatTimestamp(timestamp) {
    return timestamp.getFullYear()+'-'+this.ensureDoubleDigits((timestamp.getMonth()+1))+'-'+this.ensureDoubleDigits(timestamp.getDate())+' '
    +this.ensureDoubleDigits(timestamp.getHours())+':'+this.ensureDoubleDigits(timestamp.getMinutes())+':'+this.ensureDoubleDigits(timestamp.getSeconds())
  }

  ensureDoubleDigits(timeUnit) {
    if (timeUnit < 10) {
      return '0'+timeUnit
    }
    return timeUnit
  }

  async addIssue(issueDesc, issueSeverity) {
    var issue = {};
    issue.project_id = this.state.project_id
    issue.author = this.state.currentUser.user_id
    issue.issue_desc = issueDesc
    issue.severity = issueSeverity
    issue.issue_timestamp = this.formatTimestamp(new Date())

    await fetch("http://localhost:3001/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    })
    await this.getAllIssues()
    this.getMatches()
  }

  async deleteIssue(issue) {
    await fetch(`http://localhost:3001/issues/${issue.issue_id}`, {
      method: "DELETE",
    });
    await this.getAllIssues()
    this.getMatches()
  }

  async resolveIssue(issueResolution) {
    var issue = {}
    issue.is_resolved = true
    issue.resolve_date = new Date().toISOString().slice(0, 10);
    issue.resolution = issueResolution

    await fetch(
      `http://localhost:3001/resolve-issue/${this.state.selectedIssue.issue_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
      }
    );
    await this.getAllIssues()
    this.getMatches()
  }

  parseDatabaseDate(databaseDate) {
    if (databaseDate === null) {
      return "N/A";
    }
    var date = new Date(databaseDate);
    return (
      date.getDate() +
      " " +
      this.state.months[date.getMonth()] +
      " " +
      date.getFullYear()
    );
  }

  async getProjectID(){
    if (JSON.parse(localStorage.getItem('user')).roles[0] === 'General Manager') {
      this.setState({project_id:parseInt(localStorage.getItem('selectedProjectId'),10)})
    } else {
      const response = await fetch('http://localhost:3001/team-members');
      const json = await response.json()
      for (let i = 0; i < json.length; i++) {
        if (json[i].user_id === JSON.parse(localStorage.getItem('user')).user_id) {
          this.setState({project_id: json[i].project_id}) 
        }
      }
    }
  }

  async getAllIssues(){
    const response = await fetch(`http://localhost:3001/issues`);
    const jsonData = await response.json();
    this.setState({issues: jsonData}, () => {
      this.getMatches()
    });
  };

  getMatches() {
    var tempMatches = [];
    this.state.issues.map((issue) => {
      if (issue.project_id === this.state.project_id) {
        tempMatches.push(issue);
      }
    });
    this.setState({matches: tempMatches})
  };

  resolutionParse(is_resolved, resolution)
  {
    let answer = "";
    if(is_resolved === "true")
    {
      answer = resolution;
    }
    else if(is_resolved === "false")
    {
      answer = "N/A";
    }
    return answer;
  }

  getStatusColor(status) {
    if (status === "Completed" || status === "Low") {
      return "#08DB0F";
    }
    if (status === "Not Started" || status === "High") {
      return "#FF0000";
    }
    if (status === "Started" || status === "Medium") {
      return "#FDC12A";
    }
    return "#ffffff";
  }

  render()
  {  return (
    <div>
        {this.state.showIssueModal ? (
          <div
            className="back-drop"
            onClick={() => {
              this.closeIssueModal();
            }}
          ></div>
        ) : null}
        {this.state.showResolveModal ? (
          <div
            className="back-drop"
            onClick={() => {
              this.closeResolveModal();
            }}
          ></div>
        ) : null}
      <DisplayIssues
        userType = {this.state.userType}
        issuesFlag = {this.state.issuesFlag}
        matches = {this.state.matches}
        resolutionParse = {this.resolutionParse.bind(this)}
        openIssueModal = {this.openIssueModal.bind(this)}
        openResolveModal = {this.openResolveModal.bind(this)}
        getStatusColor = {this.getStatusColor.bind(this)}
        deleteIssue = {this.deleteIssue.bind(this)}
        parseDatabaseDate = {this.parseDatabaseDate.bind(this)}
      />
      <IssueModal
        showIssueModal = {this.state.showIssueModal}
        closeIssueModal = {this.closeIssueModal.bind(this)}
        addIssue = {this.addIssue.bind(this)}
      />
      <ResolveModal
        selectedIssue = {this.state.selectedIssue}
        showResolveModal = {this.state.showResolveModal}
        closeResolveModal = {this.closeResolveModal.bind(this)}
        resolveIssue = {this.resolveIssue.bind(this)}
      />
    </div>
    );
  }
};




export default IssueTracker;
