module.exports = {
    HOST: "database",
    USER: "admin",
    PASSWORD: "admin",
    DB: "project-mgmt",
    PORT: "5432",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
