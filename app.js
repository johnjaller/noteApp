const express = require('express')
const app = express()
const cors=require("cors")
const exphbs=require("express-handlebars")
const basicAuth=require("express-basic-auth")
const myAuthroizer=require("./auth.js")
const fs=require("fs")
const path=require("path")
const NoteService = require('./noteService.js')
const NoteRouter=require("./noteRouter.js")
const port = 8080

const noteService= new NoteService("/data.json")
const noteRouter=new NoteRouter(noteService)
app.use(cors())
app.use(basicAuth({challenge:true,authorizer:myAuthroizer}))
app.engine("handlebars",exphbs())
app.set("view engine","handlebars")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) =>{
    noteService.readNote(req.auth.user).then((userData)=>{
   
    res.render("home",{
        username:req.auth.user,
        noteArr:userData
    })
}).catch((err)=> {if(err) throw err})
})
app.use("/api/notes",noteRouter.router())




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports=app

