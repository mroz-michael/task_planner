<?php
/** queries used in API handlers **/
function getTasksQuery():string {
    return "select * from tasks";
}