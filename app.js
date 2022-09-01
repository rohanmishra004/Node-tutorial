const express = require('express');
const app = express()
const morgan  = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog');


/**

IMP note with regards to password - 
The following characters must be converted using 
percent encoding
 if included in a username or password:

: / ? # [ ]       ,@ = %40

For example, if your password in plain-text is p@ssw0rd'9'!, you need to encode your password as:

p%40ssw0rd%279%27%21

*/




//connect to mongodb - 
const dbURI = 'mongodb+srv://rohan_9011:Traf%40123@cluster-node.ubsec.mongodb.net/Blog_app?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true , useUnifiedTopology: true })
.then((result)=>app.listen(3000,()=>{   
    console.log('Server running...')
}))
.catch((err)=>console.log(err)) 

app.set('view engine','ejs') 

//MIDDLEWARES ---------------------------------------------------
//static middleware for css and other similar type files
app.use(express.static('public')) 

//to access request from form page , we use the following middleware- this takes all the url encoded data and passes it into an object
app.use(express.urlencoded({ extended:true}))
app.use(morgan('dev'))

//-----------------------------------------------------------



/**
Examples :-
//monogose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    //here we need to create a new isntance of Blog document and store it on db
    const blog = new Blog({
        title:'new blog 1',
        snippet:'about my new blog',
        body:'more about my new blog'
    })  //Blog is the name of the model we created 
    blog.save()//this save this to the database
    .then((result)=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
    })

});
//retrieve all blog
app.get('/all-blogs',(req,res)=>{
    Blog.find()//this method on Blog model retrives all data
    .then((result)=>{
        res.send(result)
    })
    .catch(err=>{
        console.log(err)
    })    
})
//retrieve a single blog
app.get('/single-blog',(req,res)=>{
    Blog.findById('630dca6f7f8914fd691703a3')
    .then((result)=>{
        res.send(result)
    }).catch(err=>{
        console.log(err)
    })
})

 */

//Routes
app.get('/',(req,res)=>{
    res.redirect('/blogs') //this will redirect to blogs page which will display all blogs
})

app.get('/about',(req,res)=>{
    res.render('about', {title:'About'})
})


//Blog Routes
app.get('/blogs',(req,res)=>{
    Blog.find().sort({createdAt:-1}) //sorting in reverse order
    .then((result)=>{
        res.render('index',{title:'All Blogs', blogs: result})
    })
    .catch(err=>{
        console.log(err)
    })
})


//post handler
app.post('/blogs',(req,res)=>{
    //we have define urlencoded in the middleware so we can access the data coming from url data
    // console.log(req.body)
    const blog = new Blog(req.body); //we create a new instance of blog
    
    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    }).catch(err=>{
        console.log(err)
    })
})

//Create Blog request
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

//To handle specific blogs for delete or getting one blog we can use - Route parameters - these are variables of the route that may change value
app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details',{blog:result, title: 'Blog Details'})
    })
    .catch(err=>{console.log(err)})
})

//Delete Blog Request -
app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({ redirect: '/blogs'})
    })
    .catch(err=>{
        console.log(err)
    })
})


//MIDDLE-WARE -404 Error
app.use((req,res)=>{
    res.status(404).render('404',{title:'Error'})
})






