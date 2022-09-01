const mongoose = require('mongoose')
const Schema = mongoose.Schema; //this is a constructor function and we can use it to create a new schema


//Schema - defines the structure
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    snippet:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
},{ timestamps:true});


//Models - surrounds Schema and provides data based on it
const Blog = mongoose.model('blog', blogSchema) //it will check for this dataset in collection and will pluraise it 



//since our model and schema are now complete we can model to be exported 

module.exports = Blog;


