const router = require('express').Router();
const Model = require('../models');

router.get('/', async (req, res) => {
  try {
    const rows = await Model.Student.findAll();
    res.render('student', rows);
  } catch (err) {
    console.error(err);
  }
});

router.post('/', async (req, res) => {
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
    res.render('add-student', { err });
  }
});

router.get('/add', (req, res) => {
  res.render('add-student');
});

router.get('/edit/:id', async (req, res) => {
  try {
    const row = await Model.Student.findById(req.params.id);
    res.render('edit-student', { row: [row] });
  } catch (err) {
    console.error(err);
  }
});

router.post('/edit/:id', async (req, res) => {
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
});

router.get('/delete/:id', async (req, res) => {
  try {
    await Model.Student.destroy({ where: { id: req.params.id } });
    res.redirect('/students');
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;