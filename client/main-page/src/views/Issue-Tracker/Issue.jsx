import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import { SubmitIssueModal } from "./SubmitIssueModal";
import {DisplayIssues} from "./DisplayIssues";

class IssueTracker extends React.Component{

  constructor(props)
  {
    super(props)
    this.state = {
      project_id: "",
      currentUser: "",
      issues: [],
      matches: [],
      issuesFlag: false
    }
  }

  async componentDidMount()
  {
    await this.GetUser();
    await this.getAllIssues();
    await this.getMatches();
    this.setState({issuesFlag:true})

  }
  // mock selected project
  //const project_id = 2;

  //mock logged in user
   //const user_id = 6;

  //DECLARE FUNCTION FOR GETTING PROJECT ID FROM USER ID
  async getProjectID(user_id){
    try 
    {
      console.log("BEFORE FETCH");
      console.log(user_id);
      const response = await fetch(`http://localhost:3001/users/${user_id}/team`);
      const jsonData = await response.json();
      this.setState({project_id: jsonData[0].project_id});
    }
    catch (err)
    {
      console.error(err.message);
    }
  }


  //GET USER ID FROM AUTH
  async GetUser() 
  {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({currentUser: user})
      //CALL FUNCTION TO GET PROJECT ID PASSING IN THE USER ID
      this.getProjectID(user.user_id);
    }

  }



  //Vars for functions below.


  //Obtain all issues function
  async getAllIssues(){
    try {
      const response = await fetch(`http://localhost:3001/issues`);
      const jsonData = await response.json();
      this.setState({issues: jsonData});
    } catch (err) {
      console.error(err.message);
    }
  };

  //Store all issues in array


  //Obtain all issues for matched project id
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

  render()
  {  return (
    <div>
      <DisplayIssues
        issuesFlag = {this.state.issuesFlag}
        matches = {this.state.matches}
        resolutionParse = {this.resolutionParse.bind(this)}
      />
      <rux-button type="button">Add New Issue</rux-button>
      
      <SubmitIssueModal
        />
    </div>
    );

  }
  
};




export default IssueTracker;
