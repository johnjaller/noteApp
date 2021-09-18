const express = require('express')
const app = express()
const exphbs=require("express-handlebars")
const basicAuth=require("express-basic-auth")
const fs=require("fs")
const path=require("path")
const NoteService = require('./noteService.js')
const NoteRouter=require("./noteRouter.js")
const port = 8080

const noteService= new NoteService("/data.json")
const noteRouter=new NoteRouter(noteService)
app.use(basicAuth({challenge:true,authorizer:myAuthroizer,authorizeAsync:true}))
app.engine("handlebars",exphbs())
app.set("view engine","handlebars")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) =>{
    res.set("user","sam")
    noteService.readNote("sam").then((userData)=>{
    res.render("home",{
        username:"sam",
        noteArr:userData
    })
}).catch((err)=> {if(err) throw err})
})
app.use("/api/notes",noteRouter.router())




app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function myAuthroizer(username,password,callback){
const usersList=fs.readFileSync(path.join(__dirname,"users.json"),"utf-8",async(err,data)=>
{
    if(err) throw err
    return await data
})
    let parsed=JSON.parse(usersList)
    console.log(parsed.users)
    return parsed.users.filter(user=>{
        if(user.username===username&&user.password===password)
        {
            return callback(null,true)
        }
    })
}