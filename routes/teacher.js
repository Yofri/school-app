const router = require('express').Router();
const Model = require('../models');

module.exports =
  router
  .get('/', async (req, res) => {
    try {
      const rows = await Model.Teacher.findAll();
      res.render('teachers/teacher', rows);
    } catch (err) {
      console.error(err);
    }
  })
  .get('/add', (req, res) => {
    res.render('teachers/add-teacher');
  })
  .post('/', async (req, res) => {
    try {
      await Model.Teacher.create({
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
      const row = await Model.Teacher.findById(req.params.id);
      res.render('teachers/edit-teacher', { row: [row] });
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
      await Model.Teacher.update(data, {
        where: { id: req.params.id }
      });
      res.redirect('/teachers');
    } catch (err) {
      console.error(err);
    }
  })
  .get('/delete/:id', async (req, res) => {
    try {
      await Model.Teacher.destroy({ where: { id: req.params.id } });
      res.redirect('/teachers');
    } catch (err) {
      console.error(err);
    }
  });