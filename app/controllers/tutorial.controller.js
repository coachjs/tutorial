const db = require("../models")
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create
exports.create = (req,res)=>{
    // validasi request
    if(!req.body.title){
        res.status(400).send({
            message: "title tidak boleh kosong"
        });
        return;
    }

    //create 
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published?req.body.published: false
    };

    // simpen di database
    Tutorial.create(tutorial).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });
    });
}

exports.findAll = (req,res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}}:null;

    Tutorial.findAll({where:condition}).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });
    });
}