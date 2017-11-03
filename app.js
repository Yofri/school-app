const app = require('express')();
const bodyParser = require('body-parser');

const index = require('./routes/index');
const teacher = require('./routes/teacher');
const subject = require('./routes/subject');
const student = require('./routes/student');

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use('/teachers', teacher);
app.use('/subjects', subject);
app.use('/students', student);

app.listen(3000, err => {
  if (err) throw err;
  console.log(`App started on port 3000`);
});