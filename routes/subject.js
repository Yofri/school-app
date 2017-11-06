const router = require('express').Router();
const Models = require('../models');

module.exports = router
  .get('/', async (req, res) => {
    try {
      const rowsSubject = await Models.Subject.findAll();
      const rowsTeacher = await Models.Teacher.findAll();
      res.render('subjects/subject', {rowsSubject, rowsTeacher});
    } catch (err) {
      console.error(err);
    }
  })

  .get('/:id/enrolledstudents', async (req, res) => {
    try {
      const rowsStudent = await Models.StudentSubject.findAll({
        attributes: ['id', 'SubjectId', 'StudentId', 'createdAt', 'updatedAt'],
        where: {SubjectId: req.params.id},
        include: [Models.Student]
      });
      res.render('subjects/enrolled-students', {rowsStudent});
    } catch (err) {
      console.error(err);
    }
  })

  .get('/:id/givescore', async (req, res) => {
    try {
      const student = await Models.StudentSubject.find({
        attributes: ['id', 'SubjectId', 'StudentId', 'createdAt', 'updatedAt'],
        where: {id: req.params.id},
        include: [Models.Student, Models.Subject]
      });
      res.render('subjects/give-score', {student});
    } catch (err) {
      console.error(err);
    }
  })

  .post('/:id/givescore', async (req, res) => {
    console.log(req.body.id);
    const obj = {
      score: req.body.score,
      updatedAt: new Date()
    }

    try {
      await Models.StudentSubject.update(obj, {
        where: {id: req.body.id}
      });
      res.redirect('/subjects');
    } catch (err) {
      console.error(err);
    }
  });