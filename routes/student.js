const router = require('express').Router();
const Model = require('../models');

module.exports = router
  .get('/', async (req, res) => {
    try {
      const rows = await Model.Student.findAll();
      res.render('students/student', { rows });
    } catch (err) {
      console.error(err);
    }
  })

  .get('/add', (req, res) => {
    const err = {};
    res.render('students/add-student', { err });
  })

  .post('/add', async (req, res) => {
    try {
      await Model.Student.create({
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      res.redirect('/students');
    } catch (err) {
      res.render('students/add-student', { err });
    }
  })

  .get('/edit/:id', async (req, res) => {
    try {
      const row = await Model.Student.findById(req.params.id);
      res.render('students/edit-student', { row });
    } catch (err) {
      console.error(err);
    }
  })

  .post('/edit/:id', async (req, res) => {
    const data = {
      id: req.params.id,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email
    };

    try {
      await Model.Student.update(data, {
        where: { id: req.params.id }
      });
      res.redirect('/students');
    } catch (err) {
      console.error(err);
    }
  })

  .get('/delete/:id', async (req, res) => {
    try {
      await Model.Student.destroy({ where: { id: req.params.id } });
      res.redirect('/students');
    } catch (err) {
      console.error(err);
    }
  })

  .get('/:id/addsubject', async (req, res) => {
    try {
      const rowStudent = await Model.Student.findById(req.params.id);
      const rowSubject = await Model.Subject.findAll();
      res.render('students/add-subject', { rowStudent, rowSubject });
    } catch (err) {
      console.error(err);
    }
  })

  .post('/:id/addsubject', async (req, res) => {
    console.log(req.body.subjectId);
    const data = {
      StudentId: req.params.id,
      SubjectId: req.body.subjectId
    };

    try {
      await Model.StudentSubject.create(data);
      res.redirect('/students');
    } catch (err) {
      console.error(err);
    }
  });