const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// update from const to let
let todos = [
  // { id: 1, text: 'Hello, world!', status: 'active' },
  // { id: 2, text: 'Pick up groceries', status: 'active'},
  // { id: 3, text: 'Pick up laundry', status: 'active'}
];
// route to home page -- all todos
app.get('/', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });

});

// add route to active 
app.get('/active', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });

});
// add route to completed
app.get('/completed', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });

});
// add route to archived
app.get('/archived', (req, res) => {
  const bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', { bundle });
});
// gets all todos
app.get('/todos', (req, res) => {
  res.json(JSON.stringify(todos));
});
// gets an specific todo item
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => {
    return todo.id == id;
  });

  res.json(JSON.stringify(todos[index]));
});
// create new todos
app.post('/todos', (req, res) => {
  const text = req.body.data.text;
  
  if (!text) {
    res.status(400).json({ message: 'text is required' });

    return;
  }

  const id = todos.length + 1;
  const newTodo = { id, text, status: 'active'};

  todos.push(newTodo);

  res.status(201).json(todos);
});
// delete a todo item
app.delete('/todos/:id', (req, res) => {
  //item to delete
  const itemDeleted = req.body.data;

  // new array with everything EXCEPT the deleted item
  todos = todos.filter(todo => todo.id != itemDeleted.id );
  
  // resetting todos to start at index 1 once delete
  todos.map((todo, index) => {
    todo.id = index + 1;
  })
  // returns the updated data
  res.status(201).json(itemDeleted);

});
// complete all active todos
app.put('/todos/completeall', (req, res) => {
  // items to archive
  let completeAllActive = req.body;

  // updated the complete all active list
  todos = completeAllActive;

  // returns the updated data
  res.status(201).json(todos);
})

// archive all completed todos
app.put('/todos/archiveall', (req, res) => {
  // items to archive
  let archiveAllComplete = req.body
  // update the archive all complete list
  todos = archiveAllComplete 

  // returns the updated data
  res.status(201).json(todos);
})

// updates a todo item to complete
app.put('/todos/:id', (req, res) => {
    // item to update
    let itemUpdated = req.body.data
  
    // resplacing the item to update with status complete
    todos = todos.map(todo => {
      if(todo.id == itemUpdated.id) {
         todo.status = 'complete'
      }
      return todo
    })

  // returns the updated data
  res.status(201).json(itemUpdated);
}); 

// update a todo item from completed to archived
app.put('/todos/archive/:id', (req, res) => {
   // item to archive
    let archiveItem =  req.body.data

    // replacing the item to archive with archive true when status is complete
    todos = todos.map(todo => {
      if(todo.id == archiveItem.id){
        if (todo.status === 'complete'){
          todo.archive = true;
        }
      }
      return todo
    })

  // returns the updated data
  res.status(201).json(archiveItem);
})

// Node server.
const port = 3000;
const server = app.listen(port, () => {
  console.log(`---> Application started on port: ${port}`);
});

// Dev server.
const devServer = require('../../tools/development-server');
const devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
