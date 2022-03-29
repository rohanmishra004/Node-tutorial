const express = require('express');
const app = express()
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//customer middleware logger
app.use(logger)
//Cross origin resource sharing

const whiteList =['https://www.yoursite.com', 'http://127.0.0.1:5500','http://localhost:3500'] //contains list of link which allow cors access
const corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1||!origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed'))
        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOption))

//we can extract form data
app.use(express.urlencoded({extended:false}))

//to extract json data
app.use(express.json());

//extract static files - we put them in public folder - this needs to be before other files
//so we can extract static files before running script
app.use(express.static(path.join(__dirname,'public')))

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.use(errorHandler)


app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})