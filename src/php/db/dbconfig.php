<?php 
    require_once '../../../vendor/autoload.php';
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "\..\..\..\\");
    $dotenv->safeLoad();
    $host = $_ENV['DB_HOST'];
    $port = $_ENV['DB_PORT'];
    $user = $_ENV['DB_USERNAME'];
    $password = $_ENV['DB_PASSWORD'];
?>