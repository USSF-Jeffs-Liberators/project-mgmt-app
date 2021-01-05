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
  pool.query("SELECT * FROM app_user", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// SELECT all Users by User_Type
app.get("/users/type/:type", (req, res) => {
  const { type } = req.params;
  pool.query(
    "SELECT * FROM App_User WHERE User_Type = $1",
    [type],
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
    'SELECT * FROM App_User WHERE User_ID = $1',
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
    "SELECT * FROM Task WHERE Project_ID = $1",
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
    "SELECT * FROM Dependency WHERE Project_ID = $1",
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
    "SELECT * FROM Expense WHERE Project_ID = $1",
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

app.listen(port, () =>
  console.log(`Project Management API listening at http://localhost:${port}`)
);
