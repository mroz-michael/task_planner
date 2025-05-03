<?php
header("Content-Type: application/json");
include_once("../db/connection.php");
require_once '../../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "\..\..\..\\");
$dotenv->safeLoad();
$dbName = $_ENV['TEST_MODE'] == "OFF" ? $_ENV['DB_NAME'] : $_ENV['TEST_DB_NAME'];
$pdo = getPDO($dbName);

