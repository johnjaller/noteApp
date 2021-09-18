const fs=require("fs")

class NoteService{
    constructor(file){
        this.file=file
        this.note={}

    }
    init()
    {
        let fileData= fs.readFileSync(__dirname+this.file,"utf-8")
        this.note=JSON.parse(fileData)
        console.log(this.note)
    }
    readData(){
        return new Promise((resolve,reject)=>{
            fs.readFile(__dirname+this.file,"utf-8",(err,data)=>{
                if (err) reject(err)
                resolve(data)
            })
        })
    }
    writeData(string){
        return new Promise((resolve,reject)=>{
            fs.writeFile(__dirname+this.file,string,(err)=>{
                if (err) reject(err)
                resolve(this.file)
            })
        })
    }
    addNote(data,user)
    {
        this.init()
        this.note[user].push(data)
        let stringifyData=JSON.stringify(this.note)
        return this.writeData(stringifyData)
    }
    readNote(user)
    {
       return this.readData().then((data)=>{
        let noteData=JSON.parse(data)
        return noteData[user]
        })
    }
    editNote(data,index,user)
    {
        this.init()
        this.note[user][index]=data
        let sttingifyData=JSON.stringify(this.note)
        return this.writeData(sttingifyData)
    }
    deleteNote(index,user)
    {
        this.init()
       this.note[user].splice(index,1)
        let sttingifyData=JSON.stringify(this.note)
        return this.writeData(sttingifyData)
    }
}

module.exports=NoteService