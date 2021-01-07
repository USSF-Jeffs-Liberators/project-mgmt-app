exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.devBoard = (req, res) => {
    res.status(200).send("Developer Content.");
  };
  
  exports.projMgrBoard = (req, res) => {
    res.status(200).send("Project Manager Content.");
  };
  
  exports.genMgrBoard = (req, res) => {
    res.status(200).send("General Manager Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };