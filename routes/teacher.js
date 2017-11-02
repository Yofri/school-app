const router = require('express').Router();
const Models = require('../models');

module.exports =
  router.get('/', async (req, res) => {
    try {
      const rows = await Models.Teacher.findAll();
      res.render('teacher', { rows });
    } catch (err) {
      console.error(err);
    }
  });