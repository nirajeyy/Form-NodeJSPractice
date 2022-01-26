const { Router } = require('express');
const express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`listening to the ${port}`);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/loginForm.html');
});
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const username = 'niraj';
  const password = 'niraj';

  if (req.body.username === username && req.body.password === password) {
    const data = require('./data.json');
    console.log('success');
    res.status(200).send(data);
  } else {
    console.log('fail');
    res.status(500).send('fail');
  }
  console.log(req.body);
  res.send(req.body);
});

app.get('/todos', (req, res) => {
  const data = require('./data.json');
  res.sendFile(__dirname + '/toDo.html');
  // res.status(200).send(data);
});
//CRUD_POST_GET_PUT_DELETE
app.post('/todos', (req, res) => {
  const data = require('./data.json');
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;

  data.push({
    title: title,
    description: description,
    status: status,
  });
  res.status(200).send(data);
});

app.get('/todosDisplay', function (req, res) {
  const data = require('./data.json');
  res.render('toDo', { data: data });
});
