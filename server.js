const http = require('http');
const fs = require('fs')
const path = require('path')


const server = http.createServer((req,res)=>{
    // console.log(req.url,req.method) - request object contains information about url , method type etc
    //res objects - contains the respnse which we receive from the server , like http request etc

    //set header content type
    res.setHeader('Content-Type','text/html')
    // res.write("<h1>This is heading</h1>");
    // res.end()


    //when we have multiple paths so we will dynamically add path from the request

    let paths = './views/'

    //using switch we can add paths to the req.url , this way we can setup a simple routing system
    switch(req.url){
        case '/':
            paths+='index.html';
            res.statusCode = 200;
            break;
        case '/about':
            paths+='about.html';
            res.statusCode = 200;
            break;
        //redirect to another page as this link is depreciated
        case '/about-me':
            res.statusCode=301
            res.setHeader('Location','/about')
            res.end()
        default:
            paths+='404.html';
            res.statusCode = 404;
            break
    }



    //sending html files
    fs.readFile(paths,(err,data)=>{
        if(err) {
            console.log('Some error with the link')
            res.end()
        }else{
            res.write(data)
            res.end()
        }       
    });
});

server.listen(3000,()=>{
    console.log('server running on port 3000!!!')
})
