const fs =require("fs")
const path=require("path")
function myAuthroizer(username,password){
    const usersList=fs.readFileSync(path.join(__dirname,"users.json"),"utf-8",(err,data)=>
    {
        if(err) throw err
        return data
    })
        let parsed=JSON.parse(usersList)
        console.log(parsed.users)
        return parsed.users.filter(user=>{
            if(user.username===username&&user.password===password)
            {
                return true
            }
        })
    }
module.exports=myAuthroizer    