const HTTP_NOT_FOUND_STATUS = 400;

const msgNotFound = (res) => 
  res.status(HTTP_NOT_FOUND_STATUS)
  .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });

const validateWatchedAt = (watchedAt, res) => {
  if (watchedAt) {
    const [dd, mm, yyyy] = watchedAt.split('/');
    if (!(dd <= 31 && mm <= 12 && yyyy >= 1000)) {
      return res.status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return true;
  }
  return msgNotFound(res);
};

const validateRate = (rate, res) => {
  if (rate || rate === 0) {
    if (!(rate >= 1 && rate <= 5)) {
      return res.status(HTTP_NOT_FOUND_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    return true;
  }
  return msgNotFound(res);
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (talk) {
    const { rate, watchedAt } = talk;
    validateRate(rate, res);
    validateWatchedAt(watchedAt, res);
    return next();
  }
  return msgNotFound(res);
};

module.exports = validateTalk;