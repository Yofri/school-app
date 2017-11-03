const router = require('express').Router();
const Models = require('../models');

module.exports =
  router.get('/', async (req, res) => {
    try {
      const rows = await Models.Subject.findAll();
      res.render('subject', rows);
    } catch (err) {
      console.error(err);
    }
  });