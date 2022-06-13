const HTTP_NOT_FOUND_STATUS = 400;

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!(email.includes('@') && email.includes('.com'))) {
    return res.status(HTTP_NOT_FOUND_STATUS)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
 req.email = email;
 next();
};

module.exports = validateEmail;