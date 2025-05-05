<?php
/** queries used in API handlers **/
function getTasksQuery():string {
    return "select * from tasks";
}

function getTaskByIdQuery():string {
    return "select * from tasks where id = :id";
}
function postTaskQuery():string {
    //note to self:  the : before content is needed for working w. assoc arr. 
    return "insert into tasks (content) VALUES (:content)";
}

function putTaskQuery():string {
    return "update tasks set completed = NOT completed where id = :id";
}