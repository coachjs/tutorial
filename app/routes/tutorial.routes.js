module.exports= app =>{
    const tutorials = require("../controllers/tutorial.controller.js")
    const tags = require("../controllers/tag.controller.js")
    var router = require("express").Router();

    // create
    router.post("/",tutorials.create);
    // read all
    router.get("/",tutorials.findAll);
    // find by id
    router.get("/:id",tutorials.findOne);

    // update
    router.put("/:id",tutorials.update)
    // delete
    router.delete("/:id",tutorials.delete)

    // create comment
    router.post("/comments",tutorials.createComment);

    // create tag
    router.post("/tags",tags.create);

    app.use("/api/tutorials",router);


}