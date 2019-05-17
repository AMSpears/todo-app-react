import axios from 'axios';



let url = 'http://localhost:3000/todos';

 let options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
 } 
// connection to server complete all task
 export function completeAllTasks(updateAllTask){
    axios
    .put(`${url}/completeall`, updateAllTask, options)
    // .then(results => console.log(results.data))
    // .catch(err => console.log(err))
 }

// connection to server archive all items
export function archiveAllTasks(archiveAll) {
    axios
    .put(`${url}/archiveall`, archiveAll, options)
    // .then(results => console.log(results.data))
    // .catch(err => console.log(err))
}


 export default { completeAllTasks, archiveAllTasks}