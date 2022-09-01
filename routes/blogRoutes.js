const express = require('express');
const blogController = require('../controllers/blogController')
const router = express.Router();



//Blog Routes
router.get('/',blogController.blog_index)


//post handler
router.post('/',blogController.create_blog)

//Create Blog request
router.get('/create', blogController.create_blog_get);


router.get('/:id',blogController.blog_details)

//Delete Blog Request:
router.delete('/:id',blogController.blog_delete);


module.exports = router;