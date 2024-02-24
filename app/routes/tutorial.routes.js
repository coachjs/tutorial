module.exports= app =>{
    const tutorials = require("../controllers/tutorial.controller.js")
    var router = require("express").Router();

    // create
    router.post("/",tutorials.create);
    // read all
    router.get("/",tutorials.findAll);

    // update
    router.put("/:id",tutorials.update)
    // delete
    router.delete("/:id",tutorials.delete)

    // create comment
    router.post("/comments",tutorials.createComment);

    app.use("/api/tutorials",router);


}