const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "admin",
  host: "database",
  database: "project-mgmt",
  password: "admin",
  port: 5432,
});

app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

// get all users
app.get("/users", (req, res) => {
  pool.query("SELECT * FROM App_User", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
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

// get a user's team
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

// get a user's tasks
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

// get all projects
app.get("/projects", (req, res) => {
  pool.query("SELECT * FROM Project", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a project by ID
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

// get all users on teams
app.get("/team-members", (req, res) => {
  pool.query("SELECT * FROM Team_Member", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a project's team
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

// get all requirements
app.get("/requirements", (req, res) => {
  pool.query("SELECT * FROM Requirement", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a project's requirements
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

// get all tasks
app.get("/tasks", (req, res) => {
  pool.query("SELECT * FROM Task", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a task by ID
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

// get a project's tasks
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

// Inserts New Task Into Database
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

// Updates Task In Database By Task_ID
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

// Deletes Task In Database By Task_ID
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

// get all dependencies
app.get("/dependencies", (req, res) => {
  pool.query("SELECT * FROM Dependency", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a project's dependencies
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

// Inserts New Dependency Into Database
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

// Deletes Dependency In Database By Dependency_ID
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

// get a tasks's dependencies
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

// get all issues
app.get("/issues", (req, res) => {
  pool.query("SELECT * FROM Issue", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a project's issues
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

// get all funding requests
app.get("/funding-requests", (req, res) => {
  pool.query("SELECT * FROM Funding_Request", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a project's funding requests
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

// get all expenses
app.get("/expenses", (req, res) => {
  pool.query("SELECT * FROM Expense", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// get a project's expenses
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

// other endpoints...

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
