const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const listTalker = require('../middlewares/listTalker');
const validateToken = require('../middlewares/validateToken');
const validateName = require('../middlewares/validateName');
const validateAge = require('../middlewares/validateAge');
const {
  validateTalk,
  validateRate,
  validateWatchedAt } = require('../middlewares/validate_Talk');

const HTTP_OK_STATUS = 200;
const HTTP_ADD_STATUS = 201;
const HTTP_DEL_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

const router = express.Router();
router.use(bodyParser.json());

router.get('', listTalker, (req, res) => {
  const { peopleTalker } = req;
  return res.status(HTTP_OK_STATUS).json(peopleTalker);
});

router.get('/search', validateToken, listTalker, (req, res) => {
  const { peopleTalker } = req;
  const { q } = req.query;
  if (!q) {
    return res.status(HTTP_OK_STATUS).json(peopleTalker);
  } 
  const filterTalker = peopleTalker.filter((people) => people.name.includes(q));
  if (!filterTalker) {
    return res.status(HTTP_OK_STATUS).json([]);
  }   
  return res.status(HTTP_OK_STATUS).json(filterTalker);
});

router.get('/:id', listTalker, (req, res) => {
  const id = parseInt(req.params.id, Number);
  const { peopleTalker } = req;
  const filterTalker = peopleTalker.find((people) => people.id === id);
  if (!filterTalker) {
    return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }     
  return res.status(HTTP_OK_STATUS).json(filterTalker);
});

router.post('',
listTalker,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res, next) => {
    try {
      const { name, age, talk } = req.body;
      const { peopleTalker } = req;
      const id = peopleTalker.length + 1;
      const newTalker = { name, age, id, talk };
      peopleTalker.push(newTalker);
      await fs.writeFile('./talker.json', JSON.stringify(peopleTalker));
  
      return res.status(HTTP_ADD_STATUS).json(newTalker);
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id',
  listTalker,
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateRate,
  validateWatchedAt,
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, Number);
      const { name, age, talk } = req.body;
      const { peopleTalker } = req;
      const indexTalker = peopleTalker.findIndex((people) => people.id === id);
  
      if (indexTalker >= 0) {
        const newTalker = { name, age, id, talk };
        peopleTalker[indexTalker] = newTalker;
        await fs.writeFile('./talker.json', JSON.stringify(peopleTalker));
        return res.status(HTTP_OK_STATUS).json(newTalker);
      }
      return res.status(HTTP_NOT_FOUND_STATUS)
        .json({ message: 'Pessoa palestrante não encontrada' });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id',
  validateToken,
  listTalker,
  async (req, res) => {
    const id = parseInt(req.params.id, Number);
    const { peopleTalker } = req;
    const filterDelTalker = peopleTalker.filter((people) => people.id !== id);
    await fs.writeFile('./talker.json', JSON.stringify(filterDelTalker));
    return res.status(HTTP_DEL_STATUS).end();
  });

module.exports = router;