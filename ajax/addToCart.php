<?php
require "../connect.php"; // adding connect code from connect.php

$userSessionID = session_id();

// getting the parameters id if it is found, sanitize and validate
$flowerID = filter_input(INPUT_POST, "flowerID", FILTER_SANITIZE_NUMBER_INT);


if (isset($flowerID)) {

    //deccrease item quantity by one from flower table
    $cmdFlowerTb = "UPDATE flower                       
                    SET quantity = quantity - 1
                    WHERE id = ?";
    $stmtFlowerTb = $dbh->prepare($cmdFlowerTb);
    $successFlowerTb = $stmtFlowerTb->execute([$flowerID]);

    //add to the cart
    $cmdCartTb = "INSERT
                  into cart (flowerID, sessionID)
                  VALUES (? , ?)";
    $stmtCartTb = $dbh->prepare($cmdCartTb);
    $successCartTb = $stmtCartTb->execute([$flowerID, $userSessionID]);

} 



if (!$successFlowerTb or !$successCartTb) {
    header("Location: error.html"); //redirect to error page
}
