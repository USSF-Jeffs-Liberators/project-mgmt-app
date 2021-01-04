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

// get all users of a type
app.get("/users/:type", (req, res) => {
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
  console.log(`Project Management API listening at http://localhost:${port}`)
);
