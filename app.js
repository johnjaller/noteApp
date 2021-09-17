const express = require('express')
const app = express()
const exphbs=require("express-handlebars")
const basicAuth=require("express-basic-auth")
const fs=require("fs")
const path=require("path")
const port = 3000
app.use(basicAuth({challenge:true,authorizer:myAuthroizer,authorizeAsync:true}))
app.engine("handlebars",exphbs())
app.set("view engine","handlebars")
app.use(express.static("public"))

app.get('/', (req, res) =>{
    res.render("home",{
        username:"John"
    })
})
// app.use("/api/notes",noteRouter.route())




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