const router = require('express').Router();
const Models = require('../models');

module.exports = router
  .get('/', async (req, res) => {
    try {
      const rows = await Models.Teacher.findAll({
        order: [['first_name', 'ASC']],
        include: [Models.Subject]
      });
      res.render('teachers/teacher', { rows });
    } catch (err) {
      console.error(err);
    }
  })

  .get('/add', (req, res) => {
    const err = {};
    res.render('teachers/add-teacher', { err });
  })

  .post('/add', async (req, res) => {
    try {
      await Models.Teacher.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      res.redirect('/teachers');
    } catch (err) {
      res.render('teachers/add-teacher', { err });
    }
  })

  .get('/edit/:id', async (req, res) => {
    try {
      const rowTeacher = await Models.Teacher.findById(req.params.id);
      const rowSubject = await Models.Subject.findAll();
      res.render('teachers/edit-teacher', { rowTeacher, rowSubject });
    } catch (err) {
      console.error(err);
    }
  })

  .post('/edit/:id', async (req, res) => {
    const data = {
      id: req.params.id,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      SubjectId: req.body.subjectId
    };

    try {
      await Models.Teacher.update(data, {
        where: { id: req.params.id }
      });
      res.redirect('/teachers');
    } catch (err) {
      console.error(err);
    }
  })

  .get('/delete/:id', async (req, res) => {
    try {
      await Models.Teacher.destroy({ where: { id: req.params.id } });
      res.redirect('/teachers');
    } catch (err) {
      console.error(err);
    }
  });