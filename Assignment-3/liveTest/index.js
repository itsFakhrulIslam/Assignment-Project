const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination:function(req,file,callBack){
    callBack(null, './uploads')
  },
  filename:function(req,file,callBack){
    callBack(null, file.originalname)
  }
})

const upload = multer({storage:storage}).single('myFile')

app.post('/', function(req, res){
  upload(req, res, function(error){
    if(error){
      res.send("My file upload failed");
    }else {
      res.send("My file upload successfully");
    }
  })
})

app.listen(2020, function(){
  console.log("2020 port running success.");
})