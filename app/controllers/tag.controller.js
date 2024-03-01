const db = require("../models")
const Tutorial = db.tutorials;
const Tag = db.tag;

exports.create= (req,res) =>{
    // get req 
    const tagnya = {
        name : req.body.name
    };
    // create atau simpen ke database
    Tag.create(tagnya).then(data =>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message : "terjadi error"
        });
    });

}
