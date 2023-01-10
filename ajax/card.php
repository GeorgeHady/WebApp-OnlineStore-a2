<?php
require "../connect.php"; // adding connect code from connect.php

// getting the parameters id if it is found, sanitize and validate
$id = filter_input(INPUT_POST, "id", FILTER_SANITIZE_NUMBER_INT); // flower id

// gett  record from the table

if (isset($id)) {                                         //get data (Everything)
    $command = "SELECT id, name, category, description, price, quantity, photo
                FROM flower
                WHERE id = ?";
    $stmt = $dbh->prepare($command);
    $success = $stmt->execute([$id]);
} 

if (!$success ) {
    header("Location: error.html"); //redirect to error page
}


$flowerRecord = $stmt->fetch();


// write json encoded array to HTTP response
echo json_encode($flowerRecord);
