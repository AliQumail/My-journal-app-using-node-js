const express = require("express")
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


const app = express()


app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/journalDB",{useNewUrlParser: true,useUnifiedTopology: true } );

const journalSchema = {
  title : String,
  body : String
}
const Journal = mongoose.model('Journal',journalSchema)

app.listen(3000,()=>{
  console.log("server at port 3000");
})

app.get('/home',(req,res)=>{
   Journal.find({},(err,journals)=>{
     res.render("home",{ journals : journals})
   })
})

app.get('/compose',(req,res)=>{
  res.render("compose")
})

app.get('/about',(req,res)=>{
  res.render("about")
})

app.get('/contact',(req,res)=>{
  res.render('contact')
})

app.post('/compose',(req,res)=>{
  const journal = new Journal({
    title:req.body.title,
    body:req.body.body
  })
  journal.save((err)=>{
    if (!err){
      res.redirect("/home")
    }

  })




})

app.get("/journals/:title",(req,res)=>{
   const t = req.params.title
   Journal.findOne({_id:t},(err,journal)=>{
       res.render("params",{ title:journal.title , body:journal.body})
   })
})
//
// Journal.remove({},(err)=>{
//   if (!err){
//     console.log("delete successful")
//   }
// });
