const HTTP_NOT_FOUND_STATUS = 400;

const validatePasswd = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return res.status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
 req.password = password;
 next();
};

module.exports = validatePasswd;