$(document).ready(onReady);

function onReady(){
    console.log('jQuery ready to rock and roll!!');
    $('#submitBtn').on('click', handleSubmit);
    $('#to-do-list').on('click', '.completed' , taskCompleted);
    $('#to-do-list').on('click', '.delete' , taskDelete)

    getTask();
};

function handleSubmit(){
    console.log('Submit button was clicked');

    let toDo = $('#to-do').val();
    

    $.ajax({
        method: 'POST',
        url: '/task',
        data: {
            toDo
        }
    }).then(function(response){
        console.log(response);
        getTask();
    }).catch(function(error){
        console.log('POST error' , error);
    })
    
};

function getTask(){
    console.log('In getTask');
    // ajax call to server to get tasks
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then(function(response){
        console.log(response);
        taskRender(response);
    }).catch(function(error){
        console.log('Error in GET function' , error);
    })
}; // end getTask

function taskRender(taskList){
    $('#to-do-list').empty();
    console.log(taskList[0])

    for (let task of taskList) {
        // for each task append a new to the table
        // we will also append a completed button and a delete button

        $('#to-do-list').append(`
        <tr id="${task.id}" data-id = ${task.id}>
            <td>${task.todo}</td>
            <td><button class = "completed">Completed</button></td>
            <td><button class = "delete">Delete</button></td>
        </tr>
        
        `);
        if (task.completed === true){
            $(`#${task.id}`).css("background-color" , "green")
        }
    }
};

// PUT

function taskCompleted(){
    let idToUpdate = $(this).closest('tr').data('id');
    console.log(idToUpdate);
    

    $.ajax({
        method: 'PUT',
        url: `/task/${idToUpdate}`
    }).then(function(response){
        console.log(response);
        getTask();
    }).catch(function(error){
        console.log(error)
    }) 
};

// DELETE

function taskDelete(){
    const idToDel = $(this).closest('tr').data('id');

    console.log('Delete button was clicked');

    $.ajax({
        method: 'DELETE',
        url: `/task/${idToDel}`
    }).then(function(response){
        console.log(response);
        getTask();
    }).catch(function(error){
        console.log('Error with deleting task', error);
    })
};