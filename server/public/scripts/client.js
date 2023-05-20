$(document).ready(onReady);

function onReady(){
    console.log('jQuery ready to rock and roll!!');
    $('#submitBtn').on('click', handleSubmit);
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
        // getTask();
    }).catch(function(error){
        console.log('POST error' , error);
    })
};

// function getTask(){
//     console.log('In getTask');
//     // ajax call to server to get tasks
// }