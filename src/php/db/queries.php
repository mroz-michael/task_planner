<?php
/** queries used in API handlers **/
function getTasksQuery():string {
    return "select * from tasks";
}

function postTaskQuery():string {
    //note to self:  the : before content is needed for working w. assoc arr. 
    return "insert into tasks (content) VALUES (:content)";
}