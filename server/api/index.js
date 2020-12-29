const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3001
const cors = require('cors');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'database',
    database: 'project-mgmt',
    password: 'admin',
    port: 5432,
})

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

// users endpoints
app.get('/users', (req, res) => {
  pool.query('SELECT * FROM App_User', (error, results) => {
      if (error) {
          throw error;
      }
      res.status(200).json(results.rows)
  })
})

// project endpoints
app.get('/projects', (req, res) => {
  pool.query('SELECT * FROM Project', (error, results) => {
      if (error) {
          throw error;
      }
      res.status(200).json(results.rows)
  })
})

// other service endpoints...

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))