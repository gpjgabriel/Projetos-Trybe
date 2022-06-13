module.exports = (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) next({ status: 400, message: 'Some required fields are missing' });

  next();
};