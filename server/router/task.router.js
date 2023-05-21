const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');



// POST
taskRouter.post('/', (req, res) =>{
    console.log(req.body);
    let queryText = `INSERT INTO "to_do_list" ("todo") VALUES ($1);`;
    
    pool.query(queryText, [req.body.toDo])
    .then((result) =>{
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error in GET', error);
        res.sendStatus(500)
    })
});






// GET
taskRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "to_do_list"`;
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
taskRouter.put('/:id' , (req , res) => {
    let idToUpdate = req.params.id
    console.log('got to put' , req.params.id);

    let complete = req.body.completed
    console.log(complete);

    let queryText = `UPDATE "to_do_list"
    SET "completed" = '1'
    WHERE "id" = $1;
    `
    pool.query(queryText , [idToUpdate])
    
    .then(result => {
        console.log('Task updated', result.rows)
        res.sendStatus(201)
    })
    .catch(error => {
        console.log('Query text:' , queryText, 'error', error);
        res.sendStatus(500);
    })
});


// DELETE

taskRouter.delete ('/:id' , (req , res) => {
    const idToDel = req.params.id;

    let queryText = 'DELETE FROM "to_do_list" WHERE "id" = $1; ';
    
    pool.query(queryText , [idToDel])
    .then((result) => {
        console.log(`ToDo deleted with the id ${idToDel}, ${result.rows}`);
        res.sendStatus(200)
    })
    .catch((error) => {
        console.log('Error with deleting ToDo');
        res.sendStatus(500)
    })
});
module.exports = taskRouter;