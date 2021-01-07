const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/dev",
    [authJwt.verifyToken, authJwt.isDeveloper],
    controller.devBoard
  );

  app.get(
    "/api/test/pm",
    [authJwt.verifyToken, authJwt.isProjectManager],
    controller.projMgrBoard
  );

  app.get(
    "/api/test/gm",
    [authJwt.verifyToken, authJwt.isGeneralManager],
    controller.genMgrBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};