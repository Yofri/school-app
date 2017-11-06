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
        attributes: ['id'],
        where: {SubjectId: req.params.id},
        include: [Models.Student]
      });
      res.render('subjects/enrolled-students', {rowsStudent});
    } catch (err) {
      console.error(err);
    }
  });