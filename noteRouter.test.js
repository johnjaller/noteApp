const express = require("express");
const expressBasicAuth = require("express-basic-auth");
const app = express();
const NoteRouter = require("./noteRouter.js");

describe("testing for route", () => {
  beforeEach(() => {
    noteService = {
      readNote: jest.fn().mockResolvedValue(true),
      addNote: jest.fn().mockResolvedValue(true),
      deleteNote: jest.fn().mockResolvedValue(true),
      editNote: jest.fn().mockResolvedValue(true),
    };
    noteRouter = new NoteRouter(noteService);

    res = {
      status: jest.fn().mockResolvedValue(200),
      json: () => {
        return "Error?";
      },
    };
  });
  test("get should call readNote",   (done) => {
    noteRouter.get({auth:{user:"sam"}},res).then(()=>{
       expect(noteService.readNote).toHaveBeenCalledWith("sam")
    done()})
  });
  test("post should call addNote and readNote",   (done) => {
    noteRouter.post(  {
      auth: {
        user: "sam",
      },
      body: {
        note: "amazing",
      },
    },res).then(()=>{
       expect(noteService.addNote).toHaveBeenCalledWith("amazing","sam")
       expect(noteService.readNote).toHaveBeenCalledWith("sam")
    done()})
  });
  test("put should call editNote and readNote",   (done) => {
    noteRouter.put(  {
      auth: {
        user: "sam",
      },
      params:{index:1},
      body: {
        note: "amazing",
      },
    },res).then(()=>{
       expect(noteService.editNote).toHaveBeenCalledWith("amazing",1,"sam")
       expect(noteService.readNote).toHaveBeenCalledWith("sam")
    done()})
  });
  test("delete should call deleteNote and readNote",   (done) => {
    noteRouter.delete(  {
      auth: {
        user: "sam",
      },
      params:{index:1},
      
    },res).then(()=>{
       expect(noteService.deleteNote).toHaveBeenCalledWith(1,"sam")
       expect(noteService.readNote).toHaveBeenCalledWith("sam")
    done()})
  });
});
