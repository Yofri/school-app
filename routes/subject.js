const router = require('express').Router();
const Models = require('../models');

module.exports = router
  .get('/', async (req, res) => {
    try {
      const rowsSubject = await Models.Subject.findAll();
      const rowsTeacher = await Models.Teacher.findAll();
      res.render('subject', { rowsSubject, rowsTeacher });
    } catch (err) {
      console.error(err);
    }
  });