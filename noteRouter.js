const express=require("express")
class NoteRouter{
    constructor(NoteService) {
        this.NoteService=NoteService
    }
    router(){
        let router=express.Router()
        router.get("/",this.get.bind(this))
        router.post("/",this.post.bind(this))
        router.put("/:index",this.put.bind(this))
        router.delete("/:index",this.delete.bind(this))
        return router
    }
    get(req,res)
    {
        return this.NoteService.readNote(req.headers.user).then((userData)=>{
            res.json(userData)
        }).catch((err)=> {if(err) throw err})
    }
    post(req,res)
    {
        return this.NoteService.addNote(req.body.note,req.headers.user).then(()=>{
            this.NoteService.readNote(req.headers.user).then((userData)=>{
                res.json(userData)
            })
        }).catch((err)=> {if(err) throw err})
    }
    put(req,res)
    {
        return this.NoteService.editNote(req.body.note,req.params.index,req.headers.user).then(()=>{
            this.NoteService.readNote(req.headers.user).then((userData)=>{
                res.json(userData)
            })
        }).catch((err)=> {if(err) throw err})
    }
    delete(req,res)
    {
        return this.NoteService.deleteNote(req.params.index,req.headers.user).then(()=>{
            this.NoteService.readNote(req.headers.user).then((userData)=>{
                res.json(userData)
            })
        }).catch((err)=> {if(err) throw err})
    }
    
}
module.exports=NoteRouter