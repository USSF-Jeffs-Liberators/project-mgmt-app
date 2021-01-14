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
                    <th>Submit Date</th>
                    <th>Resolve Date</th>
                    <th>Resolution</th>
                    {props.userType === "Project Manager" ? (<th>Options</th>) : (null)}
                </tr>
                
                {props.matches.map((issue) => (        
                    <tr>
                        <td>{issue.issue_desc}</td>
                        <td><font color={props.getStatusColor(issue.severity)}>{issue.severity}</font></td>
                        <td>{props.parseDatabaseDate(issue.issue_timestamp)}</td>
                        <td>{props.parseDatabaseDate(issue.resolve_date)}</td>
                        <td width="250">{props.resolutionParse(issue.is_resolved.toString(), issue.resolution)}</td>
                        {props.userType === "Project Manager" ? (
                            issue.is_resolved ? (<td>
                                <button class="rux-button" onClick={() => {
                                    props.deleteIssue(issue)
                                }}>
                                    Delete
                                </button>
                            </td>) : (<td>
                                <button class="rux-button" onClick={()=> {
                                    props.openResolveModal(issue)
                                }}>
                                    Resolve
                                </button>
                            </td>
                            )
                        ) : (null)}
                    </tr>)
                    )
                }
                {props.userType === "Developer" ? (
                    <tr>
                        <th colspan="5">
                            <div class="button-div2">
                                <button class="rux-button" onClick={() => {
                                    props.openIssueModal()
                                }}>Add New Issue</button>
                            </div>
                        </th>
                    </tr>
                ) : (null)}
            </table> 
        </div>
        )
    } else {
        return (null)
    }

}

