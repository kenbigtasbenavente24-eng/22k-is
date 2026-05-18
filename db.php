<?php
    $host = 'localhost';
    $db   = '22k_db';        // Database name
    $user = 'root';          // XAMPP default username
    $pass = '';              // XAMPP default password (blank)
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (\PDOException $e) {
        // If connection fails, return an error message
        echo json_encode(["status" => "error", "message" => "Database connection failed"]);
        exit;
    }
?>