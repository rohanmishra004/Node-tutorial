const { application } = require("express");
const Blog = require("../models/blog")

//blog_index , blog_details, blog_create_get , blog_create_post , blog_delete

//getting all blogs
const blog_index = (req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'All Blogs', blogs:result})
    })
    .catch(err =>{
        console.log(err)
    })
};


//create-blog-get
const create_blog_get = (req,res)=>{
    res.render('create',{title:'Create Blog'  })
}

//create-blog-post
const create_blog = (req,res)=>{
    const blog = new Blog(req.body); //new instance

    blog.save()
    .then((result)=>[
        res.redirect('/blogs')
    ]).catch(err => console.log(err))
}

//getting blog as per id
const blog_details = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(result =>{
        res.render('details',{title:'Blog Details', blog:result})
    }).catch(err => console.log(err))
}

//delete blog
const blog_delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(result => res.json({redirect:'/blogs'}))
    .catch(err => console.log(err))
}


module.exports = {
    blog_index , blog_details , create_blog , create_blog_get , blog_delete
}