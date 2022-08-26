const express =require('express')
const path = require('path')
//express app
const app = express() // new instance of express app

//listening to request
app.listen(3000, ()=> {
    console.log('server running ....')
})
//simple sending html
app.get('/',(req,res)=>{
    // res.send('<p>This is para</p>') ; //automatically sets content-type and status code depending upon the request
    res.sendFile(path.join(__dirname,'views','index.html'))
})


app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','about.html'))
})

//redirect
app.get('/about-us',(req,res)=>{
    res.redirect('/about')
})

//404 - when no link is triggered above this link only then 404 is triggered
app.use((req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})





