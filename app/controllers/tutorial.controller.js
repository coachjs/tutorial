const db = require("../models")
const Tutorial = db.tutorials;
const Comment = db.comments;
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


// read all
exports.findAll = (req,res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}}:null;

    Tutorial.findAll({
        where:condition,
        include:["comments"]
    }).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "ada error"
        });
    });
}

// update
exports.update=(req,res)=>{
    const id = req.params.id
    Tutorial.update(req.body,{
        where: {id: id}
    }).then(num=>{
        if (num == 1){
            res.send({
                message : "Tutorial sukses di update"
            });
        }else{
            res.send({
                message : "tidak bisa diupdate"
            });
        }
    }).catch(err=>{
        res.status(500).send({
            message : "server error"
        });
    });
}

// delete
exports.delete = (req,res)=>{
    const id = req.params.id
    Tutorial.destroy({
        where: {id : id}
    }).then(num => {
        if (num == 1){
            res.send({
                message : "berhasil delete"
            })
        }else{
            res.send({
                message : "tidak berhasil delete"
            })
        }
    }).catch(err =>{
        res.status(500).send({
            message : "tidak berhasil delete. server error"
        })
    })
}

// create comment
exports.createComment = (req,res)=>{
    const comment = {
        tutorialId : req.body.tutorialId,
        name : req.body.name,
        text : req.body.text
    };

    Comment.create(comment).then(data =>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send({
            message : err.message || "error"
        });
    });

}


