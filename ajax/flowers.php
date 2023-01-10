<?php
require "../connect.php"; // adding connect code from connect.php


// getting the parameters id if it is found, sanitize and validate
$category = filter_input(INPUT_POST, "category", FILTER_SANITIZE_SPECIAL_CHARS); // category
$listNumber = filter_input(INPUT_POST, "listNumber", FILTER_SANITIZE_NUMBER_INT); // list number

if (!isset($listNumber)) {
    $listNumber = 1;
}
$listStartRow = ($listNumber - 1) * 7; // each page is 7 rows. first row index is 0 not 1, if list=1 must start conting from row 0. list=2 >>>> start from row index 7 .........

// preper the select command
// gett  records from the table

if (!isset($category)) {                                         //get data (Everything)

    $command = "SELECT id, name, category, description, price, quantity, photo
                FROM flower
                ORDER BY name
                LIMIT $listStartRow, 7";
    $stmt = $dbh->prepare($command);
    $success = $stmt->execute();

    $commandCOUNT = "SELECT count(*) AS count
                FROM flower";
    $stmtCOUNT = $dbh->prepare($commandCOUNT);
    $successCOUNT = $stmtCOUNT->execute();

} else {                                                        //get specific category

    $command = "SELECT id, name, category, description, price, quantity, photo
                FROM flower
                WHERE category = ?
                ORDER BY name
                LIMIT $listStartRow, 7";
    $stmt = $dbh->prepare($command);
    $param = [$category];
    $success = $stmt->execute($param);

    $commandCOUNT = "SELECT count(*) AS count
                     FROM flower
                     WHERE category = ?";
    $stmtCOUNT = $dbh->prepare($commandCOUNT);
    $paramCOUNT = [$category];
    $successCOUNT = $stmtCOUNT->execute($paramCOUNT);
}


if (!$success or !$successCOUNT) {
    header("Location: error.html"); //redirect to error page
}


$flowers = [];
while ($row = $stmt->fetch()) {
    array_push($flowers, [
        "id" => $row["id"],
        "name" => $row["name"],
        "category" => $row["category"],
        "description" => $row["description"],
        "price" => (float)$row["price"],
        "quantity" => (int)$row["quantity"],
    ]);
}

//devid numners on 7 to get page as each page contain 7 rows
array_push($flowers, [
    "listNumber" => (int)$listNumber,   //must put (int) as it changes to string secand request
    "numberOfLists" => ceil($stmtCOUNT->fetch()["count"] / 7),
]);

// write json encoded array to HTTP response
echo json_encode($flowers);
