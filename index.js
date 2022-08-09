const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const commitmentsService = require("./services/commitmentsService.js")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

mongoose.connect("mongodb://localhost:27017/agendamento", {useNewUrlParser: true, useUnifiedTopology: true})

app.get('/', (req, res) => {
    res.render('index')
})

app.get("/cadastro", (req, res) => {
    res.render("create")
})

app.post("/create", async (req, res) => {
    const status = await commitmentsService.createCommitments(
        req.body.name, 
        req.body.email,
        req.body.description,
        req.body.cpf,
        req.body.date,
        req.body.time
    )

    if(status){
        res.redirect("/")
    }else{
        res.send("Ocorreu uma falha!")
    }
})

app.get("/getCalendar", async (req, res) => {
    let commitments = await commitmentsService.getAllCommitments(false)
    res.json(commitments)
})

app.get('/event/:id', async (req, res) => {
    
})

app.listen(8080, () => {console.log("SERVIDOR RODANDO!")})