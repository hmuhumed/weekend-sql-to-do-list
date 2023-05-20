const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');



// POST
taskRouter.post('/', (req, res) =>{
    console.log(req.body);
    let queryText = 'INSERT INTO "to_do_list" ("todo") VALUES ($1);';
    pool.query(queryText, [req.body.todo])
    .then(result =>{
        res.send(201);
    })
    .catch(error => {
        console.log('Error in GET', error);
        res.sendStatus(500)
    })
});






// GET
taskRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to_do_list"';
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error' , error);
        res.sendStatus(500);
    })
});




// PUT





// DELETE

module.exports = taskRouter;