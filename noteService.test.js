const NoteService = require("./noteService.js");
const fs = require("fs");
describe("NoteService testing on Promise and init()", () => {
  beforeEach(() => {
    data = {
      sam: ["awesome", "a", "fucking ", "asda", "dasd"],
      aka: ["OMG", "AMAZING", "one moe?", "last note"],
      john: ["Fuck"],
    };
    dataString = JSON.stringify(data);
    testFilePath = "/testdata.json";
    fs.writeFileSync(__dirname + testFilePath, dataString, "utf-8");
    noteService = new NoteService("/testdata.json");
  });
  test("init() should retrieve data from file to this.note", () => {
    noteService.init();
    expect(noteService.note).toEqual(data);
  });
  test("readData() should resolve data string from target filepath", () => {
    expect(noteService.readData()).resolves.toBe(dataString);
  });
  test("writeData() should resolve target filepath", () => {
    expect(noteService.writeData(dataString)).resolves.toBe(testFilePath);
  });
  
});

describe("NoteService testing on async function", () => {
  beforeEach(() => {
    data = {
      sam: ["awesome", "a", "fucking ", "asda", "dasd"],
      aka: ["OMG", "AMAZING", "one moe?", "last note"],
      john: ["Fuck"],
    };
    dataString = JSON.stringify(data);
    testFilePath = "/testdata.json";
    fs.writeFileSync(__dirname + testFilePath, dataString, "utf-8");
    noteService = new NoteService("/testdata.json");
});
test("addNote(data,user) should add data to specific user", () => {
    let spyOnWriteData=jest.spyOn(noteService,"writeData")
    spyOnWriteData.mockImplementation((data)=> console.log(data))
    let newData = "Hard working";
    let user = "sam";
    noteService.addNote(newData, user);
    expect(noteService.note[user]).toEqual([
      "awesome",
      "a",
      "fucking ",
      "asda",
      "dasd",
      "Hard working",
    ]);
    expect(spyOnWriteData).toHaveBeenCalled()

})
test("addNote(data,user) should add data to new user if no user can be found in data", () => {
    let spyOnWriteData=jest.spyOn(noteService,"writeData")
    spyOnWriteData.mockImplementation((data)=> console.log(data))
    let newData = "Hard working";
    let user = "Ken";
    noteService.addNote(newData, user);
    expect(noteService.note[user]).toEqual([
      newData
    ]);
    expect(spyOnWriteData).toHaveBeenCalled()

})
test("readNote(data,user) should return specific note to respective user", async() => {
    let user = "sam";
    
   await expect(noteService.readNote(user)).resolves.toEqual(["awesome", "a", "fucking ", "asda", "dasd"]);

})
test("editNote(data,user) should change data to respective user ", () => {
    let spyOnWriteData=jest.spyOn(noteService,"writeData")
    spyOnWriteData.mockImplementation((data)=> console.log(data))
    let newData = "Hard working";
    let index=1
    let user = "sam";
    noteService.editNote(newData,index,user)
    expect(noteService.note[user][index]).toEqual(newData);
    expect(spyOnWriteData).toHaveBeenCalled()

})
test("deleteNote(data,user) should delete data to respective user ", () => {
    let spyOnWriteData=jest.spyOn(noteService,"writeData")
    spyOnWriteData.mockImplementation((data)=> console.log(data))
    let index=1
    let user = "sam";
    noteService.deleteNote(index,user)
    expect(noteService.note[user]).toEqual(["awesome", "fucking ", "asda", "dasd"]);
    expect(spyOnWriteData).toHaveBeenCalled()

})

});
