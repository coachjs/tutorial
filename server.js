const express = require('express')
const cors = require("cors")
const app = express()

// setting origin cors
var corsoption ={
    origin: "http://localhost:4000"
}
app.use(cors(corsoption))

// parse request content type - application/json
app.use(express.json())
// parse request application/x-www-force-urlencode
app.use(express.urlencoded({extended: true}))

// sync database
const db = require("./app/models")
db.sequelize.sync({force:true}).then(()=>{
    console.log("sync db")
}).catch((err)=>{
    console.log(`failed to sync karena ${err.message}`)
})

// route /
app.get("/",(req,res)=>{
    res.json({
        message : "Selamat datang di tutorial"
    })
})

//route tutorial
require("./app/routes/tutorial.routes")(app);

// setting port listen
const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})