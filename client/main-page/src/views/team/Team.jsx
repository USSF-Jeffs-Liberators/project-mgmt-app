import React, { useEffect, useState } from "react";

// As a project manager, I want to add or remove developers from project my team.

const TeamRoster = (props) => {
    // mock selected project
    props = {
        userType: "Project Manager",
        project_id: 2
    }

    const [users, setUsers] = useState([]);
    const [team, setTeam] = useState([]);
    const matches = [];

    const getAllUsers = async () => {
        try {
            const response = await fetch(`http://localhost:3001/users`);
            const jsonData = await response.json();
            setUsers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);


    const getTeamRoster = async () => {
        try {
            const response = await fetch(`http://localhost:3001/projects/${props.project_id}/team`);
            const jsonData = await response.json();
            setTeam(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTeamRoster();
    }, []);


    // match team roster to users
    const getMatches = () => {
        team.map(each => (users.map(user => {
            each.user_id === user.user_id 
                ? matches.push(user) 
                : null
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
        } catch (err) {
          console.error(err.message);
        }
    }

    const handleAddMember = () => {
        <p>Test</p>
    }
    
    return (
        <table id="teamRoster" className="rux-table">
            <tbody>
                <tr className="rux_table__column-head">
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Role</th>
                    { props.userType === "Project Manager" ? <th>Modify</th> : null }
                </tr>
                {getMatches()}
                {matches.map(user => (
                    <tr key={user.user_id}>
                        <td>{user.last_name}</td>
                        <td>{user.first_name}</td>
                        <td>{user.user_type}</td>
                        { props.userType === "Project Manager" 
                            ? <td><rux-button 
                                size="small" 
                                icon="caution" 
                                onClick={() => handleDeleteMember(user.user_id)}>
                                Remove
                            </rux-button></td>
                            : null }
                    </tr>
                ))}
                { props.userType === "Project Manager"
                    ? <tr><rux-button
                        onClick={() => handleAddMember()}>
                        Add Team Member
                    </rux-button></tr>
                    : null }
            </tbody>
        </table>
    );
};

export default TeamRoster;