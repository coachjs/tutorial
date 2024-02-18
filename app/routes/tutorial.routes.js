module.exports= app =>{
    const tutorials = require("../controllers/tutorial.controller.js")
    var router = require("express").Router();

    // create
    router.post("/",tutorials.create);
    // read all
    router.get("/",tutorials.findAll);

    app.use("/api/tutorials",router);
}