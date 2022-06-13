const HTTP_NOT_FOUND_STATUS = 400;

const msgNotFound = (res) => 
  res.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });

const msgNotRate = (res) => 
  res.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });

const msgNotWatchedAt = (res) => 
  res.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!watchedAt) {
    return msgNotFound(res);
  }
  const [dd, mm, yyyy] = watchedAt.split('/');
  if (!(dd <= 31 && mm <= 12 && yyyy >= 1000)) {
    return msgNotWatchedAt(res);
  }
  next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  if (!(rate >= 1 && rate <= 5)) {
    if (rate || rate === 0) {
      return msgNotRate(res);
    }
    return msgNotFound(res);
  }
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return msgNotFound(res);
  }
  next();
};

module.exports = { validateTalk, validateRate, validateWatchedAt };