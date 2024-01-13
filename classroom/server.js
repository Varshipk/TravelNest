const express= require("express");
const app =express();
const session =require("express-session");
app.use(session({secret:"varshipkatiyar",
        resave:false,
        saveUninitialized:true
}));
   app.get("/reqCount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    
    res.send(`you sent req ${req.session.count} times`);
    
   })
app.get("/test",(req,res)=>{
    res.send("test successful");
})



app.listen(3000,()=>{
    console.log("server is listening on port:3000");
})