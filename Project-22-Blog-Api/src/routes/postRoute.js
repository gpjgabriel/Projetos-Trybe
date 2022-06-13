const postRoute = require('express').Router();
const {
  createPost,
  getAllPost,
  getPostId,
  // editPost, // Req 15
} = require('../controllers/postController');
const postMiddleware = require('../middlewares/postMiddleware');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
// const postEditMiddleware = require('../middlewares/postEditMiddleware'); // Req15

postRoute.post('/', postMiddleware, tokenMiddleware, createPost);
// postRoute.post('/:id', tokenMiddleware, postEditMiddleware, editPost); // Req15

postRoute.get('/', tokenMiddleware, getAllPost);
postRoute.get('/:id', tokenMiddleware, getPostId);

module.exports = postRoute;