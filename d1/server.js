const app = require("./src/app");

app.get('/',(req,res)=>{
    res.send("This is Home Page")
})

app.listen(3000,()=>{
    console.log(`Server is Runnig on port 3000......`);
})