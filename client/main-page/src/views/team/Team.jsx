import React, { useEffect, useState } from "react";

const TeamRoster = () => {
    // mock selected project
    const project_id = 2;

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
            const response = await fetch(`http://localhost:3001/projects/${project_id}/team`);
            const jsonData = await response.json();
            setTeam(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTeamRoster();
    }, []);

    
    return (
        <table className="rux-table">
            <tbody>
                <tr className="rux_table__column-head">
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Role</th>
                </tr>
                {team.map(each => (users.map(user => {each.user_id === user.user_id 
                    ? matches.push(user) 
                    : null })))}
                {matches.map(user => (
                    <tr key={user.user_id}>
                        <td>{user.last_name}</td>
                        <td>{user.first_name}</td>
                        <td>{user.user_type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeamRoster;