import React, { useEffect, useState } from "react";

const TeamRoster = (props) => {
    // mock selected project
    props = {
        userType: "Project Manager",
        project_id: 2
    }
    const [users, setUsers] = useState([]);
    const [team, setTeam] = useState([]);
    const [dailyRates, setDailyRates] = useState([]);
    const matches = [];
    const unassignedDevelopers = [];
    let selectedDeveloper = null;
    let inputRate = null;

    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users`);
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getAllUsers()}, []);

    const getTeamRoster = async () => {
        try {
            const response = await fetch(`http://localhost:3001/projects/${props.project_id}/team`);
            const jsonData = await response.json();
            setTeam(jsonData);
        } catch (err) {console.error(err.message)}
    };

    useEffect(() => {getTeamRoster()}, []);

    // const getDailyRates = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:3001/team-members`);
    //         const jsonData = await response.json();
    //         setDailyRates(jsonData);
    //     } catch (err) {console.error(err.message)}
    // }

    // useEffect(() => {getDailyRates()}, []);

    // match team roster to users
    const getMatches = () => {
        team.map(each => (users.map(user => {
            each.user_id === user.user_id ? matches.push(user) : null
        })))
        // sort by last name
        matches.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
        matches.map(each => {
            if (each.user_type === "Project Manager") {
                matches.splice(matches.indexOf(each), 1)
                matches.unshift(each)
            }
        })
    }

    getMatches();

    const handleDeleteMember = async id => {
        try {
            let body = { 
                project_id: props.project_id, 
                user_id: id
            }
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            };
            await fetch(`http://localhost:3001/projects/${props.project_id}/team/${id}`, requestOptions)
              .then(response => response.json())
              .then(response => {
              if(response.status === "failed")
              alert(response.message)})
            setTeam(team.filter(each => each.user_id !== id));
        } catch (err) {console.error(err.message)}
    }

    const handleSelectMember = e => {selectedDeveloper = e.target.value}
    const handleInputRate = e => {inputRate = e.target.value}

    const handleAddMember = async () => {
        try {
            let body = { 
                project_id: props.project_id, 
                user_id: selectedDeveloper,
                daily_rate: inputRate
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
            getDevelopers();
        } catch (err) {console.error(err.message)}
    }

    // get developers who are not assigned to this project
    const getDevelopers = () => {
        users.map(user => (team.map(each => {
            ((user !== each) && (unassignedDevelopers.indexOf(user) === -1))
                ? unassignedDevelopers.push(user) 
                : null
        })))

        // sort by last name
        unassignedDevelopers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1))
    }
    

    return (
        <section id="teamRoster">
            <table className="rux-table">
                <tbody>
                    {/* PM Table */}
                    <tr className="rux_table__column-head">
                        <th>Project Manager</th>
                        { props.userType === ("Project Manager" || "General Manager") 
                            ? <th>Daily Rate</th> : null }
                        { props.userType === "Project Manager" ? <th>&nbsp;</th> : null }
                        { props.userType === "General Manager" ? <th>Modify</th> : null }
                    </tr>
                    <tr>
                        <td>Person</td>
                        { props.userType === ("Project Manager" || "General Manager") 
                            ? <td>Daily Rate</td> : null }
                        { props.userType === "Project Manager" ? <td>&nbsp;</td> : null }
                        { props.userType === "General Manager" 
                            ? <td><rux-button 
                                size="small" 
                                icon="close-large" 
                                onClick={() => handleDeleteMember(user.user_id)}>
                                Remove
                            </rux-button></td>
                            : null }
                    </tr>
                    { props.userType === "General Manager" 
                        ? <tr>
                            <td>
                            {getDevelopers()}
                            <select className="rux-select" onChange={handleSelectMember}>
                                <option key="All" name="All">Choose Manager:</option>
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
                                onChange={handleInputRate}/>
                            </td>
                            <td><rux-button
                                size="small"
                                icon="add-large"
                                onClick={handleAddMember}>
                                Add to Team
                            </rux-button></td>
                        </tr>
                        : null }
                {/* </tbody>
            </table>
            <br />
            <table className="rux-table">
                <tbody> */}
                    <tr className="rux_table__column-head">
                        <th>Developers</th>
                        { props.userType === ("Project Manager" || "General Manager")  
                            ? <th>Daily Rate</th> : null }
                        { props.userType === ("Project Manager" || "General Manager")  
                            ? <th>Modify</th> : null }
                    </tr>
                    {matches.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.first_name} {user.last_name}</td>
                            { props.userType === ("Project Manager" || "General Manager")  
                                ? <td>{team.map(each => (
                                    each.user_id === user.user_id 
                                    ? each.daily_rate 
                                    : null
                                ))}</td> : null }
                            { props.userType === ("Project Manager" || "General Manager") 
                                ? <td><rux-button 
                                    size="small" 
                                    icon="close-large" 
                                    onClick={() => handleDeleteMember(user.user_id)}>
                                    Remove
                                </rux-button></td>
                                : null }
                        </tr>
                    ))}
                    { props.userType === ("Project Manager" || "General Manager") 
                        ? <tr>
                            <td>
                            {getDevelopers()}
                            <select className="rux-select" onChange={handleSelectMember}>
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
                                onChange={handleInputRate}/>
                            </td>
                            <td><rux-button
                                size="small"
                                icon="add-large"
                                onClick={handleAddMember}>
                                Add to Team
                            </rux-button></td>
                        </tr>
                        : null }
                </tbody>
            </table>
        </section>
    );
};

export default TeamRoster;