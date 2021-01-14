import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const TeamRoster = (props) => {
    const [userType, setUserType] = useState(undefined);
    const [projectID, setProjectID] = useState("");

    ////// GET CURRENT USER LOGGED IN //////
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setUserType(user.roles[0]);
        user.roles[0] === "General Manager"
        ? setProjectID(localStorage.selectedProjectId)
        : getProjectID(user.user_id);
      }
    }, []);

    ////// GET PROJECT ID OF USER LOGGED IN //////
    const getProjectID = async (user_id) => {
      try {
        const response = await fetch(`http://localhost:3001/users/${user_id}/team`);
        const jsonData = await response.json();
        setProjectID(jsonData[0].project_id);
      } catch (err) {console.error(err.message)}
    }

    const [users, setUsers] = useState([]);
    const [allUsersOnTeams, setAllUsersOnTeams] = useState([]);
    const [team, setTeam] = useState([]);
    const [allDevelopers, setAllDevelopers] = useState([])
    const [allManagers, setAllManagers] = useState([]);
    let developersNotOnATeam = [];
    let managersNotOnATeam = [];
    let matches = [];
    let projectDevelopers = [];
    let projectManagers = [];

    ////// GET ALL USERS //////
    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users`);
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllUsers()}, []);

    ////// GET ALL USERS ASSIGNED TO A TEAM //////
    const getAllUsersOnTeams = async () => {
        try {
            const response = await fetch(`http://localhost:3001/team-members`);
            const jsonData = await response.json();
            setAllUsersOnTeams(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllUsersOnTeams()}, []);

    ////// GET ALL USERS *NOT* ASSIGNED TO A TEAM //////
    const getUsersNotOnATeam = () => {
        let usersNotOnATeam = users.filter(user => {
            return !allUsersOnTeams.find(({user_id}) => user.user_id === user_id)
        })
        developersNotOnATeam = allDevelopers.filter(user=> {
            return usersNotOnATeam.find(({user_id}) => user.user_id === user_id)
        })
        managersNotOnATeam = allManagers.filter(user=> {
            return usersNotOnATeam.find(({user_id}) => user.user_id === user_id)
        })
        developersNotOnATeam.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
        managersNotOnATeam.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
    }

    getUsersNotOnATeam();

    ////// GET ALL TEAM MEMBERS ON THIS PROJECT //////
    const getTeamRoster = async (project_id) => {
        try {
            const response = await fetch(`http://localhost:3001/projects/${project_id}/team`);
            const jsonData = await response.json();
            setTeam(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getTeamRoster(projectID)});

    ////// GET ALL USERS WHO ARE DEVELOPERS //////
    const getAllDevelopers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/role/Developer`);
            const jsonData = await response.json();
            setAllDevelopers(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllDevelopers()}, []);

    ////// GET ALL USERS WHO ARE MANAGERS //////
    const getAllManagers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/role/Project%20Manager`);
            const jsonData = await response.json();
            setAllManagers(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllManagers()}, []);

    ////// MERGE USER DATA WITH TEAM ROSTER TO GET FIRST AND LAST NAMES //////
    const getMatches = () => {
        team.map(each => (users.map(user => {
            each.user_id === user.user_id ? matches.push(user) : null
        })))
        matches.map(each => (allDevelopers.map(developer => {
            each.user_id === developer.user_id ? projectDevelopers.push(developer) : null
        })))
        matches.map(each => (allManagers.map(manager => {
            each.user_id === manager.user_id ? projectManagers.push(manager) : null
        })))
        projectDevelopers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
        projectManagers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
    }

    getMatches()

    ////// DELETE MEMBER FROM TEAM //////
    const handleDeleteMember = async (id) => {
        try {
            let body = { 
                project_id: projectID, 
                user_id: id
            }
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            await fetch(`http://localhost:3001/projects/${projectID}/team/${id}`, requestOptions)
            .then(response => response.json())
            .then(response => {
                if(response.status === "failed")
                alert(response.message)})
            setTeam(team.filter(each => each.user_id !== id));
            getAllUsersOnTeams();
            getUsersNotOnATeam();
            } catch (err) {console.error(err.message)}
        }
        
    ////// ADD DEVELOPER //////    let inputDeveloperRate = null;
    let [selectedDeveloper, setSelectedDeveloper] = useState([])
    let [inputDeveloperRate, setInputDeveloperRate] = useState([]);

    const handleSelectDeveloper = e => {
        selectedDeveloper = e.target.value
        setSelectedDeveloper(selectedDeveloper)
    }
    const handleInputDeveloperRate = e => {
        inputDeveloperRate = e.target.value
        setInputDeveloperRate(inputDeveloperRate)
    }

    const handleAddDeveloper = async () => {
            try {
                let body = { 
                    user_id: selectedDeveloper,
                    project_id: projectID, 
                    daily_rate: inputDeveloperRate
                }
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                };
                await fetch(`http://localhost:3001/team-members`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if(response.status === "failed")
                    alert(response.message)})
                getTeamRoster(projectID);
                getMatches();
                getAllUsersOnTeams();
                getUsersNotOnATeam();
                document.getElementById("input__developerRate").value = "";
            } catch (err) {console.error(err.message)}
    }

     ////// ADD PROJECT MANAGER //////
     let [selectedManager, setSelectedManager] = useState([]);
     let [inputManagerRate, setInputManagerRate] = useState([]);

    const handleSelectManager = e => {
        selectedManager = e.target.value
        setSelectedManager(selectedManager)
    }
    const handleInputManagerRate = e => {
        inputManagerRate = e.target.value
        setInputManagerRate(inputManagerRate)
    }

    const handleUpdateManager = async () => {
        try {
            let body = { 
                user_id: selectedManager,
                project_id: projectID, 
                daily_rate: inputManagerRate
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            await fetch(`http://localhost:3001/team-members`, requestOptions)
              .then(response => response.json())
              .then(response => {
              if(response.status === "failed")
              alert(response.message)})
            getTeamRoster(projectID);
            getMatches();
            getAllUsersOnTeams();
            getUsersNotOnATeam();
            document.getElementById("input__managerRate").value = "";
        } catch (err) {console.error(err.message)}
    }

    ////// REFORMAT DOLLAR FIGURES //////
    const getDollarFigure = (amount) => {
        amount === undefined || amount === null ? "" : null;
        let output = "$" + amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        output.includes(".") ? 
            output.split(".")[1].length === 0 ? output += "00" : 
            output.split(".")[1].length === 1 ? output += "0" : null
         : output += ".00";
        return output;
    }

    return (
        <table id="teamRoster" className="rux-table">
            <tbody>
                {/* PM Table */}
                <tr className="rux_table__column-head">
                    <th>Project Manager</th>
                    { userType === "Project Manager" || userType === "General Manager" 
                        ? <th>Daily Rate</th> : null }
                    { userType === "Project Manager" ? <th>&nbsp;</th> : null }
                    { userType === "General Manager" ? <th>Modify</th> : null }
                </tr>
                {projectManagers.map(user => (
                    <tr key={user.user_id}>
                        <td>{user.first_name} {user.last_name}</td>
                        { userType === "Project Manager" || userType === "General Manager" 
                            ? <td>{team.map(each => (
                                each.user_id === user.user_id 
                                ? getDollarFigure(each.daily_rate)
                                : null
                            ))}</td> : null }
                        { userType === "Developer" ? null : null }
                        { userType === "General Manager" 
                            ? <td><rux-button 
                                size="small" 
                                icon="close-large" 
                                onClick={() => handleDeleteMember(user.user_id)}>
                                Remove
                            </rux-button></td>
                            : null }
                        { userType === "Project Manager" ? <td>&nbsp;</td> : null }
                    </tr>
                ))}
                { userType === "General Manager" 
                    ? <tr>
                        <td>
                        <select className="rux-select" onChange={handleSelectManager}>
                            <option key="All" name="All">Choose Manager:</option>
                            {managersNotOnATeam.map(each => (
                                <option key={each.user_id} value={each.user_id}>
                                    {each.first_name} {each.last_name}
                                </option>
                            ))}
                        </select>
                        </td>
                        <td className="rux-form-field rux-form-field--small">
                            <label for="input__managerRate">Daily Rate:</label>
                            <input id="input__managerRate" className="rux-input" type="number" required 
                            onChange={handleInputManagerRate}/>
                        </td>
                        <td><rux-button
                            size="small"
                            icon="add-large"
                            onClick={handleUpdateManager}>
                            Update Manager
                        </rux-button></td>
                    </tr>
                    : null }

                {/* Developer Table */}
                <tr className="rux_table__column-head">
                    <th>Developers</th>
                    { userType === "Project Manager" || userType === "General Manager"  
                        ? <th>Daily Rate</th> : null }
                    { userType === "Project Manager" || userType === "General Manager" 
                        ? <th>Modify</th> : null }
                </tr>
                {projectDevelopers.map(user => (
                    <tr key={user.user_id}>
                        <td>{user.first_name} {user.last_name}</td>
                        { userType === "Project Manager" || userType === "General Manager"  
                            ? <td>{team.map(each => (
                                each.user_id === user.user_id 
                                ? getDollarFigure(each.daily_rate)
                                : null
                            ))}</td> : null }
                        { userType === "Project Manager" || userType === "General Manager" 
                            ? <td><rux-button 
                                size="small" 
                                icon="close-large" 
                                onClick={() => handleDeleteMember(user.user_id)}>
                                Remove
                            </rux-button></td>
                            : null }
                    </tr>
                ))}
                { userType === "Project Manager" || userType === "General Manager"  
                    ? <tr>
                        <td>
                        <select className="rux-select" onChange={handleSelectDeveloper}>
                            <option key="All" name="All">Choose Developer:</option>
                            {developersNotOnATeam.map(each => (
                                <option key={each.user_id} value={each.user_id}>
                                    {each.first_name} {each.last_name}
                                </option>
                            ))}
                        </select>
                        </td>
                        <td className="rux-form-field rux-form-field--small">
                            <label for="input__developerRate">Daily Rate:</label>
                            <input id="input__developerRate" className="rux-input" type="number" required 
                            onChange={handleInputDeveloperRate}/>
                        </td>
                        <td><rux-button
                            size="small"
                            icon="add-large"
                            onClick={handleAddDeveloper}>
                            Add to Team
                        </rux-button></td>
                    </tr>
                    : null }
            </tbody>
        </table>
    );
};

export default TeamRoster;