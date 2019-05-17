const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [
  // { id: 1, text: 'Hello, world!', status: 'active' },
  // { id: 2, text: 'Pick up groceries', status: 'active'},
  // { id: 3, text: 'Pick up laundry', status: 'active'}
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
  todos = todos.filter(todo => todo.id != itemDeleted.id )
  // resetting todos to start at index 1 once delete
  todos.map((todo, index) => {
    todo.id = index + 1
    console.log(todo)
  })
  // returns the updated data
  res.status(201).json(itemDeleted);

  console.log(itemDeleted)
});

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

// archive one item
app.put('/todos/archive/:id', (req, res) => {
   // item to archive
    let archiveItem =  req.body.data

    // replacing the item to archive with archive true when status is complete
    todos = todos.map(todo => {
      if(todo.id == archiveItem.id){
        console.log(todo)
        if (todo.status === 'complete'){
          todo.archive = true;
        }
      }
      return todo
    })

  res.status(201).json(archiveItem);
})

app.put('/todos/archiveall/:id', (req, res) => {
  // items to archive
    let archiveAllComplete = req.body.data 

     
  console.log(archiveAllComplete)
  res.status(201).json(archiveAllComplete);
})

app.put('/todos/completeall/:id', (req, res) => {
  // items to archive
  let completeAllActive = req.body.data
  

  console.log(completeAllActive)
  res.status(201).json(completeAllActive);
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
