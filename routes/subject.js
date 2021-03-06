const router = require('express').Router();
const Models = require('../models');
const rating = require('../views/helpers/rating');

module.exports = router
  .get('/', async (req, res) => {
    try {
      const rowsSubject = await Models.Subject.findAll();
      const rowsTeacher = await Models.Teacher.findAll({
        order: [['first_name', 'ASC']]
      });
      res.render('subjects/subject', {rowsSubject, rowsTeacher, title: 'All Subjects'});
    } catch (err) {
      console.error(err);
    }
  })

  .get('/:id/enrolledstudents', async (req, res) => {
    try {
      const rowsStudent = await Models.StudentSubject.findAll({
        attributes: ['id', 'SubjectId', 'StudentId', 'createdAt', 'updatedAt', 'score'],
        where: {SubjectId: req.params.id},
        include: [{
          model: Models.Student,
          order: [['first_name', 'ASC']]
        }],
      });

      rowsStudent.forEach((row, index) => {
        console.log(rowsStudent[0].rating);
        rowsStudent[index].rating = rating(row.score);
      });

      res.render('subjects/enrolled-students', {
        rowsStudent, title: 'Enrolled Students'
      });
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
      res.render('subjects/give-score', {student, title: 'Give Score'});
    } catch (err) {
      console.error(err);
    }
  })

  .post('/:id/givescore', async (req, res) => {
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