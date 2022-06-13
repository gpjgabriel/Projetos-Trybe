const fs = require('fs').promises;

const file = './talker.json';
const HTTP_NOT_FOUND_STATUS = 404;

const listTalker = async (req, res, next) => {
  const peopleTalker = JSON.parse(await fs.readFile(file, 'utf-8'));
  if (!peopleTalker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Não foi possível ler o arquivo' });
  }
  req.peopleTalker = peopleTalker;
  next();
};

module.exports = listTalker;