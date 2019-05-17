import axios from 'axios';



let url = 'http://localhost:3000/todos';

 let options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
 } 

 export function completeAllTasks(updateAllTask){
     console.log(updateAllTask)
     axios
     .put(`${url}/completeall`, updateAllTask, options)
     .then(results => console.log(results.data))
     .catch(err => console.log(err))
 }

export function archiveAllTasks(archiveAll) {
      console.log("it works")
        axios
        .put(`${url}/archiveall`, archiveAll, options)
        .then(results => console.log(results.data))
        .catch(err => console.log(err))
}


 export default { completeAllTasks, archiveAllTasks}