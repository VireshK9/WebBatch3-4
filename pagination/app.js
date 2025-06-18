const express = require("express")
const app = express()

const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
    { id: 6, name: "User 6" },
    { id: 7, name: "User 7" },
    { id: 8, name: "User 8" },
    { id: 9, name: "User 9" },
    { id: 10, name: "User 10" },
    { id: 11, name: "User 11" },
    { id: 12, name: "User 12" },
    { id: 13, name: "User 13" },
    { id: 14, name: "User 14" },
    { id: 15, name: "User 15" },
    { id: 16, name: "User 16" },
    { id: 17, name: "User 17" },
    { id: 18, name: "User 18" },
    { id: 19, name: "User 19" },
    { id: 20, name: "User 20" },
    { id: 21, name: "User 21" },
    { id: 22, name: "User 22" },
    { id: 23, name: "User 23" },
    { id: 24, name: "User 24" },
    { id: 25, name: "User 25" },
    { id: 26, name: "User 26" },
    { id: 27, name: "User 27" },
    { id: 28, name: "User 28" },
    { id: 29, name: "User 29" },
    { id: 30, name: "User 30" }
  ]
  
app.get("/users",(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page-1) * limit;
    const endIndex = page*limit;

    const result = {};

    if(endIndex < users.length){
        result.next = {
            page: page+1,
            limit:limit
        }
    }

    if(startIndex>0){
        result.previous = {
            page:page-1,
            limit:limit
        }
    }
    result.data = users.slice(startIndex,endIndex)

    res.json(result)

})

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})