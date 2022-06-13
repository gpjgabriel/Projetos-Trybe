const postService = require('../services/postService');

const createPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { userId } = req;

    const dataPost = { title, content, userId, categoryIds };

    const post = await postService.createPost(dataPost);

    return res.status(201).json(post);
  } catch (error) {
    next({ status: 400, message: '"categoryIds" not found' });
  }
};

const getAllPost = async (_req, res, next) => {
  try {
    const posts = await postService.getAllPost();

    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getPostId(id);

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = req;

    const dataPost = { id, title, content, userId };

    const post = await postService.editPost(dataPost);

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPost,
  getPostId,
  editPost,
};