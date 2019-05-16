const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  { id: 1, text: 'Hello, world!', status: 'active' },
  { id: 2, text: 'Pick up groceries', status: 'active'},
  { id: 3, text: 'Pick up laundry', status: 'active'}
];

app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
});

app.get('/todos', (req, res) => {
  res.json(JSON.stringify(todos));
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id == id;
  });

  res.json(JSON.stringify(todos[index]));
});

app.post('/todos', (req, res) => {
  const text = req.body.data.text
  
  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

  const id = todos.length + 1;
  const newTodo = { id, text, status: 'active'};

  todos.push(newTodo);

  res.status(201).json(todos);
});

app.delete('/todos/:id', (req, res) => {
  //item to delete
  const itemDeleted = req.body.data

  // new array with everything EXCEPT the deleted item
   todos.filter(todo => todo.id != itemDeleted.id )

  // returns the updated data
  res.status(201).json(itemDeleted);
});

app.put('/todos/:id', (req, res) => {
    // item to update
    let itemUpdated = req.body.data

    // new array updating data status to complete 
    if (itemUpdated.status === 'active') {
      todos.filter(todo => todo.id == itemUpdated.id)[0].status = 'complete'
      // new array updating data archive to true 
    } else if (itemUpdated.status === 'complete') {
      todos.filter(todo => todo.id == itemUpdated.id)[0].archive = true
    }

  console.log(itemUpdated)

  // returns the updated data
  res.status(201).json(itemUpdated);
}); 


// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
