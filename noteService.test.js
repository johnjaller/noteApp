const NoteService =require("./noteService.js").NoteService
const fs=require("fs")
describe("NoteService testing",()=>{
    beforeEach(()=>{
        data={"sam":["awesome","a","fucking ","asda","dasd"],"aka":["OMG","AMAZING","one moe?","last note"],"john":["Fuck"]}
        testFilePath="/testdata.json"
        fs.writeFileSync(__dirname+testFilePath,data,"utf-8")
        noteService=new NoteService("/testdata.json")

    })
    test("init should retrieve data from file to this.note",()=>{
        let spy
    })
})