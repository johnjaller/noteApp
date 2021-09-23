const fs=require("fs")

class NoteService{
    constructor(file){
        this.file=file
        this.note={}

    }
    init()
    {
        let fileData= fs.readFileSync(__dirname+this.file,"utf-8")
        console.log(fileData+" Hello world")
        if(fileData===undefined){
            this.note={}
        }else{
        this.note=JSON.parse(fileData)
        }
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
        if(this.note[user]===undefined){
            this.note[user]=[data]
        }else{
        this.note[user].push(data)
        }
        let stringifyData=JSON.stringify(this.note)
        return this.writeData(stringifyData)
    }
    readNote(user)
    {
       return this.readData().then((data)=>{
           this.init()
           
        let noteData=JSON.parse(data)
        if(noteData[user]===undefined){
            return []
        }else{
        return noteData[user]
        }
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
        console.log(index+"this is index")
        console.log(user)
        this.init()
       this.note[user].splice(index,1)
        let sttingifyData=JSON.stringify(this.note)
        return this.writeData(sttingifyData)
    }
}

module.exports=NoteService