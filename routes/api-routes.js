
var db = require("../models");


module.exports = function(app) {


  app.get("/api/all", function(req, res) {
    db.lists.findAll({})
    .then(function(data) {
      res.json(data);
    });

  });

    app.post("/api/all", function(req, res) {
    db.lists.create(req.body)
    console.log(req.body)
    
})
};
