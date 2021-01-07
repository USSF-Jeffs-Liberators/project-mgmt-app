const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.user_id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isProjectManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Project Manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Project Manager Role!"
      });
    });
  });
};
isGeneralManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "General Manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require General Manager Role!"
      });
    });
  });
};
isDeveloper = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "Developer") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Developer Role!"
      });
      return;
    });
  });
};

isGeneralManagerOrProjectManager = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "General Manager") {
          next();
          return;
        }

        if (roles[i].name === "Project Manager") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require General Manager or Project Manager Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isGeneralManager: isGeneralManager,
  isProjectManager: isProjectManager,
  isDeveloper: isDeveloper,
  isGeneralManagerOrProjectManager: isGeneralManagerOrProjectManager
};
module.exports = authJwt;
