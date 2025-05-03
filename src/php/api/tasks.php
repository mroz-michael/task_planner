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

function handleGet(PDO $pdo) {
    try {
        $stmt = $pdo->prepare(getTasksQuery());
        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($res);
        return;
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode(['message' => 'GET request failed', 'error' => $e->getMessage()]);
    }
}

function handlePost(PDO $pdo, array $req) {
    // to do: create function to validate the input length
}

function handlePut(PDO $pdo, array $req) {
    
}

function handleDelete(PDO $pdo, array $req) {
    
}