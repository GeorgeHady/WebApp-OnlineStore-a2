<?php
require "../connect.php"; // adding connect code from connect.php

$userSessionID = session_id();

//get all data in cart table

    $command = "SELECT id, name, price, cart.cartID
                FROM flower
                INNER JOIN cart
                on flower.id = cart.flowerID
                WHERE cart.sessionID = ?";
    $stmt = $dbh->prepare($command);
    $success = $stmt->execute([$userSessionID]);


if (!$success) {
     header("Location: error.html"); //redirect to error page
}

// item present shopping_item table data
$cart = [];
while ($row = $stmt->fetch()) {
    array_push($cart, [
        "cartID" => $row["cartID"],
        "flowerID" => $row["id"],
        "name" => $row["name"],
        "price" => (float)$row["price"],
    ]);
}


// write json encoded array to HTTP response
echo json_encode($cart);
