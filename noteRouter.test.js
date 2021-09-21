const express=require("express")
const app=express()
const NoteRouter=require("./noteRouter.js").NoteRouter
const NoteService=require("./noteService").NoteService


describe("testing for route",()=>{
    beforeEach(()=>{
        noteRouter=new NoteRouter(NoteService)
    })
test("get /api/notes should return note data",(done)=>{
    let spyGetNoteService=jest.spyOn(noteRouter,"get")
    spyGetNoteService.mockImplementation((data)=>console.log(data))
    request(app)
    expect(spyGetNoteService).toHaveBeenCalled()
})
})