const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");

const { Pool } = require("pg");
const pool = new Pool({
  user: "admin",
  host: "database",
  database: "project-mgmt",
  password: "admin",
  port: 5432,
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.options("*", cors());
pool.on("error", (err, client) => {
  console.error("Error:", err);
});

//
// ~~~~~ /users Endpoints: ~~~~~
//

// SELECT all Users
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM App_User", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// SELECT all Users and their Projects (User_ID, First_Name, Last_Name, Project_ID, Project_Name, Start_Date, Deadline_Date)
app.get("/users/projects", (req, res) => {
  pool.query(
    'SELECT App_User.User_ID, App_User.First_Name, App_User.Last_Name, roles.name, team_member.project_id, project.project_name, project.start_date, project.deadline_date, project.end_date FROM app_user FULL OUTER JOIN user_roles ON app_user.user_id = user_roles."userId" FULL OUTER JOIN roles ON user_roles."roleId" = roles.id FULL OUTER JOIN team_member ON app_user.user_id = team_member.user_id FULL OUTER JOIN project ON team_member.project_id = project.project_id',
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT all Users and their Projects by Role (User_ID, First_Name, Last_Name, Project_ID, Project_Name, Start_Date, Deadline_Date)
app.get("/users/projects/:role", (req, res) => {
  const { role } = req.params;
  pool.query(
    'SELECT App_User.User_ID, App_User.First_Name, App_User.Last_Name, roles.name, team_member.project_id, project.project_name, project.start_date, project.deadline_date FROM app_user FULL OUTER JOIN user_roles ON app_user.user_id = user_roles."userId" FULL OUTER JOIN roles ON user_roles."roleId" = roles.id FULL OUTER JOIN team_member ON app_user.user_id = team_member.user_id FULL OUTER JOIN project ON team_member.project_id = project.project_id WHERE roles.name = $1',
    [role],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT all Users by Role
app.get("/users/role/:role", (req, res) => {
  const { role } = req.params;
  pool.query(
    'SELECT * FROM app_user FULL OUTER JOIN user_roles ON app_user.user_id = user_roles."userId" FULL OUTER JOIN roles ON user_roles."roleId" = roles.id WHERE roles.name = $1',
    [role],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a User by User_ID
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM App_User WHERE User_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a User's Team
app.get("/users/:id/team", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Team_Member WHERE User_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a User's Tasks
app.get("/users/:id/tasks", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Task WHERE Assigned_To = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT all User Roles
app.get("/user-roles", (req, res) => {
  pool.query(
    "SELECT * FROM user_roles",
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
//
// ~~~~~ /projects Endpoints: ~~~~~
//
// SELECT all Projects
app.get("/projects", (req, res) => {
  pool.query("SELECT * FROM Project", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// INSERT Project
app.post("/projects", (req, res) => {
  pool.query(
    "INSERT INTO Project (Project_Manager, Project_Name, Project_Desc, Budget, Start_Date, Deadline_Date, End_Date, Current_Cost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      req.body.project_manager,
      req.body.project_name,
      req.body.project_desc,
      req.body.budget,
      req.body.start_date,
      req.body.deadline_date,
      req.body.end_date,
      req.body.current_cost,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project by Project_ID
app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Project WHERE Project_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// UPDATE Project By Project_ID
app.post("/projects/:id/update", (req, res) => {
  pool.query(
    "UPDATE Project SET Project_Manager = $1, Project_Name = $2, Project_Desc = $3, Budget = $4, Start_Date = $5, Deadline_Date = $6, End_Date = $7, Current_Cost = $8 WHERE Project_ID = $9",
    [
      req.body.project_manager,
      req.body.project_name,
      req.body.project_desc,
      req.body.budget,
      req.body.start_date,
      req.body.deadline_date,
      req.body.end_date,
      req.body.project_id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project's Team
app.get("/projects/:id/team", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Team_Member WHERE Project_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// DELETE User from Team by User_ID
app.delete("/projects/:project_id/team/:user_id", (req, res) => {
  pool.query(
    "DELETE FROM Team_Member WHERE Project_ID = $1 AND User_ID = $2",
    [req.params.project_id, req.params.user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project's Requirements
app.get("/projects/:id/requirements", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Requirement WHERE Project_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project's Tasks
app.get("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Task WHERE Project_ID = $1 ORDER BY Task_ID ASC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project's Dependencies
app.get("/projects/:id/dependencies", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Dependency WHERE Project_ID = $1 ORDER BY Dependency_ID ASC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project's Issues
app.get("/projects/:id/issues", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Issue WHERE Project_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project's Funding Requests
app.get("/projects/:id/funding-requests", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Funding_Request WHERE Project_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Project's Expenses
app.get("/projects/:id/expenses", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Expense WHERE Project_ID = $1 ORDER BY Expense_ID ASC",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
//get project requirements by user_id
app.get("/projects/requirements/:userid", (req, res) => {
  const { userid } = req.params;
  pool.query(
    "SELECT * FROM TEAM_MEMBER INNER JOIN Requirement on team_member.project_id = requirement.project_id where user_id = $1 order by requirement_id asc", 
    [userid],
    (error, results) => {
      if(error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  )
})
app.delete("/projects/requirements", (req, res) => {
  const { requirement_id } = req.body;
  pool.query(
    "DELETE FROM Requirement WHERE requirement_id = $1",
    [requirement_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
  
});
//
// ~~~~~ /team-members Endpoints: ~~~~~
//
// SELECT all Users on Teams
app.get("/team-members", (req, res) => {
  pool.query("SELECT * FROM Team_Member", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// INSERT a User into a Team
app.post("/team-members", (req, res) => {
  pool.query(
    "INSERT INTO Team_Member (User_ID, Project_ID, Daily_Rate) VALUES ($1, $2, $3)",
    [req.body.user_id, req.body.project_id, req.body.daily_rate],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// EDIT a User's team
// app.get("/team-members/:id", (req, res) => {
//   const { id } = req.params;
//   pool.query("UPDATE Team_Member SET user_id = $1, daily_rate = $2, WHERE project_id = $3",
//   [req.body.user_id, req.body.daily_rate, id],
//   (error, results) => {
//     if (error) {
//       throw error;
//     }
//     res.status(200).json(results.rows);
//   });
// });
//
// ~~~~~ /requirements Endpoints: ~~~~~
//
// SELECT all Requirements
app.get("/requirements", (req, res) => {
  pool.query("SELECT * FROM Requirement", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// INSERT a Requirement for a Project
app.post("/requirements", (req, res) => {
  pool.query(
    "INSERT INTO Requirement (Project_ID, Requirement_Desc, Priority, Requirement_Status) VALUES ($1, $2, $3, $4)",
    [
      req.body.project_id,
      req.body.requirement_desc,
      req.body.priority,
      req.body.requirement_status,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
app.patch("/requirements/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if(req.body.requirement_desc && req.body.priority && req.body.requirement_status){
        const { requirement_desc, priority, requirement_status } = req.body;
        const updateRequirement = await pool.query(
          "UPDATE requirement SET requirement_desc = $1, priority = $2, requirement_status = $3 WHERE requirement_id = $4",
          [requirement_desc, priority, requirement_status, id]
        );

      res.status(200).json("Requirement was updated!");

    } else {
        res.status(400).send("Requirement not updated");
    }

  } catch (err) {
    console.error(err.message);
  }
});
//
// ~~~~~ /tasks Endpoints: ~~~~~
//
// SELECT all Tasks
app.get("/tasks", (req, res) => {
  pool.query("SELECT * FROM Task", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// SELECT Task by Task_ID
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Task WHERE Task_ID = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// INSERT Task
app.post("/tasks", (req, res) => {
  pool.query(
    "INSERT INTO Task (project_id, assigned_to, task_name, start_date, duration, progress) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      req.body.project_id,
      req.body.assigned_to,
      req.body.task_name,
      req.body.start_date,
      req.body.duration,
      req.body.progress,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// UPDATE Task By Task_ID
app.post("/tasks/:task_id/update", (req, res) => {
  pool.query(
    "UPDATE Task SET Assigned_To = $1, Task_Name = $2, Start_Date = $3, Duration = $4, Progress = $5 WHERE Task_ID = $6",
    [
      req.body.assigned_to,
      req.body.task_name,
      req.body.start_date,
      req.body.duration,
      req.body.progress,
      req.params.task_id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// DELETE Task By Task_ID
app.delete("/tasks/:task_id", (req, res) => {
  pool.query(
    "DELETE FROM Task WHERE Task_ID = $1",
    [req.params.task_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// SELECT a Tasks's Dependencies
app.get("/tasks/:id/dependencies", (req, res) => {
  const { id } = req.params;
  pool.query(
    "SELECT * FROM Dependency WHERE Source_Task = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
//
// ~~~~~ /dependencies Endpoints: ~~~~~
//
// SELECT all Dependencies
app.get("/dependencies", (req, res) => {
  pool.query("SELECT * FROM Dependency", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// INSERT Dependency
app.post("/dependencies", (req, res) => {
  pool.query(
    "INSERT INTO Dependency (project_id, source_task, target_task) VALUES ($1, $2, $3)",
    [req.body.project_id, req.body.source_task, req.body.target_task],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// DELETE Dependency By Dependency_ID
app.delete("/dependencies/:dependency_id", (req, res) => {
  pool.query(
    "DELETE FROM Dependency WHERE Dependency_ID = $1",
    [req.params.dependency_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
//
// ~~~~~ /issues Endpoints: ~~~~~
//
// SELECT all Issues
app.get("/issues", (req, res) => {
  pool.query("SELECT * FROM Issue", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

//Insert an Issue
app.post("/issues", (req, res) => {
  pool.query(
    "INSERT INTO Issue (project_id, author, issue_desc, severity, issue_timestamp, is_resolved, resolve_date, resolution) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [
      req.body.project_id,
      req.body.author,
      req.body.issue_desc,
      req.body.severity,
      req.body.issue_timestamp,
      req.body.is_resolved,
      req.body.resolve_date,
      req.body.resolution,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

//Update an Issue
app.post("/issues/:issue_id/update", (req, res) => {
  pool.query(
    "UPDATE Issue SET severity = $1 WHERE issue_id = $2",
    [
      req.body.severity,
      req.params.issue_id,
    ],
    (error, results) => {
      if (error){
        throw error;
      }
      res.status(200).json(results.rows);
    }
    )
})


//
// ~~~~~ /funding-requests Endpoints: ~~~~~
//
// SELECT all Funding Requests
app.get("/funding-requests", (req, res) => {
  pool.query("SELECT * FROM Funding_Request", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// INSERT Funding Request
app.post("/funding-request", (req, res) => {
  pool.query(
    "INSERT INTO Funding_Request (Project_ID, Initiator, Request_Amount, Justification, Submit_Date, Suspense_Date, Review_Date, Review_Status, Review_Note, Reviewed_By) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      req.body.project_id,
      req.body.initiator,
      req.body.request_amount,
      req.body.justification,
      req.body.submit_date,
      req.body.suspense_date,
      req.body.review_date,
      req.body.review_status,
      req.body.review_note,
      req.body.reviewed_by,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});
//
// ~~~~~ /expenses Endpoints: ~~~~~
//
// SELECT all Expenses
app.get("/expenses", (req, res) => {
  pool.query("SELECT * FROM Expense", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// other endpoints...

//  post a new funding request
app.post("/funding-requests", (req, res) => {
  pool.query(
    "INSERT INTO Funding_Request (project_id, initiator, request_amount, justification, submit_date, suspense_date) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      req.body.project_id,
      req.body.initiator,
      req.body.request_amount,
      req.body.justification,
      req.body.submit_date,
      req.body.suspense_date,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

//  post a new expense
app.post("/expenses", (req, res) => {
  pool.query(
    "INSERT INTO Expense (project_id, expense_desc, expense_type, expense_amount) VALUES ($1, $2, $3, $4)",
    [
      req.body.project_id,
      req.body.expense_desc,
      req.body.expense_type,
      req.body.expense_amount,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// update an expense
app.post("/expenses/:id", (req, res) => {
  pool.query(
    "UPDATE Expense SET Project_ID = $1, Expense_Desc = $2, Expense_Type = $3, Expense_Amount = $4 WHERE Expense_ID = $5",
    [
      req.body.project_id,
      req.body.expense_desc,
      req.body.expense_type,
      req.body.expense_amount,
      req.params.id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// deletes an expense
app.delete("/expenses/:id", (req, res) => {
  pool.query(
    "DELETE FROM Expense WHERE Expense_ID = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// updates a project's current cost
app.post("/projects/:id", (req, res) => {
  pool.query(
    "UPDATE Project SET Current_Cost = $1 WHERE Project_ID = $2",
    [req.body.current_cost, req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// deletes a funding request
app.delete("/funding-requests/:id", (req, res) => {
  pool.query(
    "DELETE FROM Funding_Request WHERE Request_ID = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// updates a funding request
app.post("/edit-funding-requests/:id", (req, res) => {
  pool.query(
    "UPDATE Funding_Request SET Project_ID = $1, Request_Amount = $2, Justification = $3, Suspense_Date = $4 WHERE Request_ID = $5",
    [
      req.body.project_id,
      req.body.request_amount,
      req.body.justification,
      req.body.suspense_date,
      req.params.id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// updates the review status of a funding request
app.post("/review-funding-requests/:id", (req, res) => {
  pool.query(
    "UPDATE Funding_Request SET Project_ID = $1, Review_Date = $2, Review_Status = $3, Review_Note = $4, Reviewed_By = $5 WHERE Request_ID = $6",
    [
      req.body.project_id,
      req.body.review_date,
      req.body.review_status,
      req.body.review_note,
      req.body.reviewed_by,
      req.params.id,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});

// updates a labor expenses's amount
app.post("/update-labor-expense", (req, res) => {
  pool.query(
    "UPDATE Expense SET Expense_Amount = $1 WHERE Project_ID = $2 AND Employee = $3",
    [
      req.body.expense_amount,
      req.body.project_id,
      req.body.employee,
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
});


app.listen(port, () =>
  console.log(`Project Management API listening at http://localhost:${port}`)
);
