<?php
session_start();

try {
    $dbh = new PDO( // Conniction On XAMPP 
        "mysql:host=localhost;dbname=george",
        "root",
        ""
    );
} catch (Exception $e) {
    die("ERROR: Couldn't connect. {$e->getMessage()}");
}
