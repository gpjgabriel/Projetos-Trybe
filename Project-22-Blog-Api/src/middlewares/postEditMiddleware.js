const { getPostId } = require('../services/postService');

module.exports = async (req, _res, next) => {
  const { userId } = req;
  const { id } = req.params;

  await getPostId(id);

  // if (!post) next({ status: 404, message: 'Post does not exist' });

  if (userId !== id) next({ status: 401, message: 'Unauthorized user' });

  next();
};
