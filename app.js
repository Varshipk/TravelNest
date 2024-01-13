const express=require("express");
const app=express();
const mongoose=require("mongoose");
let port =8080;
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const listings =require("./routes/listing.js");
const reviews=require("./routes/review.js");
//set view engine
 app.set("view engine","ejs");
 app.set("views",path.join(__dirname,"views"));
 app.use(express.urlencoded({extended:true}));
 app.use(methodOverride("_method"));
 app.engine("ejs",ejsMate);
  app.use(express.static(path.join(__dirname,"/public/")));

//create mongo db connection
 const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
 main().then(()=>{
    console.log("connected to DB");
 }).catch(err=>{
    console.log(err);
 })
 //main method
  async function main(){
    await mongoose.connect(MONGO_URL);
  }

 //root route
 app.get("/",(req,res)=>{
  res.send("root is working");
})
 

    //express router
    app.use("/listings",listings);
    app.use("/listings/:id/reviews",reviews);
    
//no page found
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not found!"));
})

//ExpressError class handling Error
app.use((err,req,res,next)=>{
let{statusCode=500,message="something went wrong"}=err;
// res.status(statusCode).send(message);
res.status(statusCode).render("listings/error.ejs",{message});
})
app.listen(port,()=>{
    console.log(`server is listening on port:${port}`)
})