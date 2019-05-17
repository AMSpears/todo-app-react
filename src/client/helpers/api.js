/**
* Fetches to the backend and directs results to proper function for processing
*
* @param  {string} method - Request method
* @param  {object} data - Todo object
* @param  {function} cb - Callback function for returned data
*/
export function api(method, data, cb) {
  const promise = getApiPromise(method, data);

  promise.then(json => {
    if (typeof cb === 'function') {
      cb(json);
    }
  })
  .catch(err => {
    console.log('error:', err);
  });
}

/**
 * HTML request to the backend
 * @param  {string} method - Request method
 * @param  {object} data - Todo object
 *
 * @returns {promise} - Promise from the fetch request to the backend
 */
export function getApiPromise(method, data) {
  let url = 'http://localhost:3000/todos';
  if (['DELETE', 'PUT'].indexOf(method) !== -1) {
    url += `/${data.id}`;
  }
  // connect to ARCHIVE put request 
  
  if (method === 'ARCHIVE'){
    url += `/archive/${data.id}`;
    console.log('api Archive')
    console.log(method)
  }
  // connect to ARCHIVEALL PUT request
   if (method === 'ARCHIVEALL') {
     url += `/archiveall/${data.id}`;
     console.log('api Archive all')
     console.log(method)
   }

  // connect to COMPLETEALL PUT request
    if (method === 'COMPLETEALL') {
      url += `/completeall/${data.id}`;
       console.log('api complete all')
       console.log(method)
    }
  const options = {
    // adding archive , archiveAll and completeAll methods to API
    method: method === "ARCHIVE" || method ===  "ARCHIVEALL" || method === "COMPLETEALL" ? "PUT" :
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
console.log(method)
  if (data) {
    options.body = JSON.stringify({
      data,
    });
  }

  return fetch(url, options)
  .then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));
    }

    return response.json();
  })
};
