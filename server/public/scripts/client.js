$(document).ready(onReady);

function onReady(){
    console.log('jQuery ready to rock and roll!!');
    $('#submitBtn').on('click', handleSubmit);
};

function handleSubmit(){
    console.log('Submit button was clicked');
};