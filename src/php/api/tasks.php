<?php
header("Content-Type: application/json");
include_once("../db/connection.php");
require_once '../../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "\..\..\..\\");
$dotenv->safeLoad();


$dbName = $_ENV['TEST_MODE'] == "OFF" ? $_ENV['DB_NAME'] : $_ENV['TEST_DB_NAME'];
$pdo = getPDO($dbName);

$method = $_SERVER['REQUEST_METHOD'];
include("../db/queries.php");

$req = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
        handlePost($pdo, $req);
        break;
    case 'PUT':
        handlePut($pdo, $req);
        break;
    case 'DELETE':
        handleDelete($pdo, $req);
        break;
    default:
        echo json_encode(['message' => 'Invalid request method']);
        break;
}

/**
 * helper function to set headers and echo a response to HTTP requests
 * @param $data the response body to send to the client
 * @param $statusCode the status code of the response
 */
function respond(array $data, int $statusCode = 200) {
    header('Content-Type: application/json');
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

function handleGet(PDO $pdo) {
    try {
        $stmt = $pdo->prepare(getTasksQuery());
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!$res) {
            respond(['error' => 'Tasks not found'], 404);
        }

        respond($res);
    } catch (PDOException $e) {
        respond(['error' => $e->getMessage()], 500);
    }
}

/**
 * helper function to ensure task object exists and has valid content length <= 50 chars
 * @param $taskArr an associative array of the task object
 * @return true if $taskArr['content'] exists and is of length between [0->50] else false
 */
function validateContent($taskArr): bool {
    if (!$taskArr || !$taskArr['content']) {
        return false;
    }

    $length = strlen($taskArr['content']);
    return $length > 0 && $length <= 50;
}

/**
 * sanitizes the text input from the user
 * @param $content the task's content, inputted by user
 * @return string containing the sanitized input
 */
function sanitizeContent($content): string {
    return htmlspecialchars($content, ENT_QUOTES, "UTF-8");
}
 
function handlePost(PDO $pdo, array $req) {

    if (!validateContent($req))  {
        respond(['error' => 'Missing or malformatted task'], 400);
    }

    try {
        $stmt = $pdo->prepare(postTaskQuery());
        $req['content'] = sanitizeContent($req['content']);
        $stmt->execute($req);
        $res = ['id' => $pdo->lastInsertId(), 'content' => $req['content']];
        respond($res, 201);
    } catch (PDOException $e) {
        respond(['error' => $e->getMessage()], 500);
    }
}

function handlePut(PDO $pdo, array $req) {
    
}

function handleDelete(PDO $pdo, array $req) {
    
}