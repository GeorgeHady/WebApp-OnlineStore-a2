<?php
require "../connect.php"; // adding connect code from connect.php

// preper the select command
// gett all records from shopping_item table
$command = "SELECT DISTINCT category
            FROM flower
            ORDER BY category";
$stmt = $dbh->prepare($command);
$success = $stmt->execute(); // execute select commsnd
if (!$success) {
    header("Location: error.html"); //redirect to error page
}


$categories = [];

while ($row = $stmt->fetch()) {
    array_push($categories, ["category" => $row["category"]]);
}

// write json encoded array to HTTP response
echo json_encode($categories);
