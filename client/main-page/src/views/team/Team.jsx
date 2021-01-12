import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

const TeamRoster = (props) => {
    const [userType, setUserType] = useState(undefined);
    const [projectID, setProjectID] = useState("");

    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setUserType(user.roles[0]);
        getProjectID(user.user_id);
      }
    }, []);

    const getProjectID = async (user_id) => {
      try {
        const response = await fetch(`http://localhost:3001/users/${user_id}/team`);
        const jsonData = await response.json();
        setProjectID(jsonData[0].project_id);
      } catch (err) {console.error(err.message)}
    }

    const [users, setUsers] = useState([]);
    const [team, setTeam] = useState([]);
    const [allDevelopers, setAllDevelopers] = useState([])
    const [allManagers, setAllManagers] = useState([]);
    let matches = [];
    let projectDevelopers = [];
    let projectManagers = [];
    let unassignedDevelopers = [];
    let unassignedManagers = [];
    let selectedManager = null;
    let inputManagerRate = null;

    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users`);
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllUsers()}, []);

    const getTeamRoster = async (project_id) => {
        try {
            const response = await fetch(`http://localhost:3001/projects/${project_id}/team`);
            const jsonData = await response.json();
            setTeam(jsonData);
        } catch (err) {console.error(err.message)}
    };


    useEffect(() => {projectID ? getTeamRoster(projectID) : null});

    const getAllDevelopers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/role/Developer`);
            const jsonData = await response.json();
            setAllDevelopers(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllDevelopers()}, []);

    const getAllManagers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users/role/Project%20Manager`);
            const jsonData = await response.json();
            setAllManagers(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllManagers()}, []);

    // match team roster to users
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

    getMatches();

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
            } catch (err) {console.error(err.message)}
        }
        
    ////// ADD DEVELOPER //////
    let selectedDeveloper;
    let inputDeveloperRate;

    const handleSelectDeveloper = e => {
        selectedDeveloper = e.target.value
        console.log(selectedDeveloper)
    }
    const handleInputDeveloperRate = e => {
        inputDeveloperRate = e.target.value
        console.log(inputDeveloperRate)
    }

    const handleAddDeveloper = async () => {
            try {
                let body = { 
                    user_id: selectedDeveloper,
                    project_id: projectID, 
                    daily_rate: inputDeveloperRate
                }
                console.log(body)
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
                getTeamRoster();
                getMatches();
            } catch (err) {console.error(err.message)}
    }

    // get developers who are not assigned to this project
    const getUnassignedDevelopers = () => {
        unassignedDevelopers = allDevelopers.filter(developer => {
            return !projectDevelopers.includes(developer)
        })
        // sort by last name
        unassignedDevelopers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
    }

    getUnassignedDevelopers();

     ////// ADD PROJECT MANAGER //////
    const handleSelectManager = e => {selectedManager = e.target.value}
    const handleInputManagerRate = e => {inputManagerRate = e.target.value}

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
            getTeamRoster();
            getMatches();
        } catch (err) {console.error(err.message)}
    }

    // get managers who are not assigned to this project
    const getUnassignedManagers = () => {
        unassignedManagers = allManagers.filter(manager => {
            return !projectManagers.includes(manager)
        })
        // sort by last name
        unassignedManagers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
    }

    getUnassignedManagers();

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
                        { userType === "General Manager"  
                            ? <td>{team.map(each => (
                                each.user_id === user.user_id 
                                ? getDollarFigure(each.daily_rate)
                                : null
                            ))}</td> : null }
                        { userType === "Project Manager" ? <td>&nbsp;</td> : null }
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
                            {unassignedManagers.map(each => (
                                <option key={each.user_id} value={each.user_id}>
                                    {each.first_name} {each.last_name}
                                </option>
                            ))}
                        </select>
                        </td>
                        <td className="rux-form-field rux-form-field--small">
                            <label for="input__text">Daily Rate:</label>
                            <input id="input__text" className="rux-input" type="number" required 
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
                            {unassignedDevelopers.map(each => (
                                <option key={each.user_id} value={each.user_id}>
                                    {each.first_name} {each.last_name}
                                </option>
                            ))}
                        </select>
                        </td>
                        <td className="rux-form-field rux-form-field--small">
                            <label for="input__text">Daily Rate:</label>
                            <input id="input__text" className="rux-input" type="number" required 
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