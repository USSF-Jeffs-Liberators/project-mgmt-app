import React from "react";

export const DisplayIssues = (props) =>
{
    if (props.issuesFlag) {
        return (
            <div>
            <table className="rux-table">
                <tr className="rux_table__column-head">
                    <th>Description</th>
                    <th>Severity</th>
                    <th>Resolution</th>
                </tr>
                
                {props.matches.map((user) => (        
                    <tr>
                        <td>{user.issue_desc}</td>
                        <td>{user.severity}</td>
                        <td>{props.resolutionParse(user.is_resolved.toString(), user.resolution)}</td>

                    </tr>)
                    )
                }
            </table> 
        </div>
        )
    } else {
        return (null)
    }

}

