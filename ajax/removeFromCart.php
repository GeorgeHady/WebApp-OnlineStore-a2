<?php
require "../connect.php"; // adding connect code from connect.php


// getting the parameters id if it is found, sanitize and validate
$cartID = filter_input(INPUT_POST, "cartID", FILTER_SANITIZE_NUMBER_INT);


if (isset($cartID)) {

    //increase item quantity by one from flower table
    $cmdFlowerTb = "UPDATE flower
                    SET quantity = quantity + 1
                    WHERE id = ( SELECT flowerID
                                 FROM cart
                                 WHERE cartID = ? )";
    $stmtFlowerTb = $dbh->prepare($cmdFlowerTb);
    $successFlowerTb = $stmtFlowerTb->execute([$cartID]);

    //remove from the cart
    $cmdCartTb = "DELETE FROM cart
                  WHERE cartID = ?";
    $stmtCartTb = $dbh->prepare($cmdCartTb);
    $successCartTb = $stmtCartTb->execute([$cartID]);

}


if (!$successFlowerTb or !$successCartTb) {
    header("Location: error.html"); //redirect to error page
}
