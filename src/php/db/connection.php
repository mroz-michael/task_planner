<?php 

    /**
     * Creates and returns a PDO connected to the database defined in the local .env file
     * @param string $dbname the name of the database to connect to
     * @return PDO 
     */
    function getPDO(string $dbname): PDO {
        require_once '../../../vendor/autoload.php';
        require_once("dbconfig.php");    
        try {
            $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $dbname . ";port=" . $_ENV['DB_PORT'];
            $pdo = new PDO($dsn, $user, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch(PDOException $e) {
            exit("DB connection failed : " .$e->getMessage());
        }
    }

?>