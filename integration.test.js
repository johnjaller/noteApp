const request=require("supertest")
const app=require("./app.js")
const tester=request(app)
describe('Router test', () => {
    afterAll(async () => {
        await new Promise(resolve => setTimeout(() => resolve(), 1000)); // avoid jest open handle error
    })
    test('GET / should return 401 if no auths', (done) => {
        request(app).get("/").expect(401).end(async(err,res)=>{
            if(err) throw err
            await done()
        })
    });
    test('GET / should return 200 if correct auths is given', (done) => {
        request(app)
        .get("/").auth("sam","123").expect(200).end(async(err,res)=>{
            if(err) throw err
            await done()
        })
    });
    test('GET / should return resepctive data if correct auths is given', (done) => {
        request(app)
        .get("/").auth("sam","123").expect(200).expect("Content-Type", "text/html; charset=utf-8").end(async(err,res)=>{
            if(err) throw err
            await done()
        })
    });
    test('GET /api/notes should return 200 if correct auths is given', (done) => {
        request(app)
        .get("/api/notes").auth("sam","123").expect(200).end((err,res)=>{
            if(err) throw err
            done()
        })
    });
    test('GET /api/notes should return 401 if no auths is given', (done) => {
        request(app)
        .get("/api/notes").auth("sam","123").expect(200).end((err,res)=>{
            if(err) throw err
            done()
        })
    });
    test('POST /api/notes should return 401 if no auths is given', (done) => {
        request(app)
        .post("/api/notes").expect(401).end((err,res)=>{
            if(err) throw err
            done()
        })
    });
    test('PUT /api/notes should return 401 if no auths is given', (done) => {
        request(app)
        .put("/api/notes").expect(401).end((err,res)=>{
            if(err) throw err
            done()
        })
    });
    test('DELETE /api/notes should return 401 if no auths is given', (done) => {
        request(app)
        .delete("/api/notes").expect(401).end((err,res)=>{
            if(err) throw err
            done()
        })
    });
});