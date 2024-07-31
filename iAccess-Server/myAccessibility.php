<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Include config file
require_once('includes/database.php');
// include('includes/config.php');


$method = isset($_GET['method']) ? $_GET['method'] : ''; 
$userId = isset($_GET['userId']) ? $_GET['userId'] : ''  ;
$accommodationId = isset($_GET['accommodationId']) ? $_GET['accommodationId'] : ''  ;


if ($method == 'All') {
    $stmt = $connect->prepare("SELECT * FROM my_accessibilties WHERE user_id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    $bookmarks = [];
    while ($row = $result->fetch_assoc()) {
        $bookmarks[] = $row["accommodation_id"];
    }

    echo json_encode($bookmarks);

} elseif ($method == 'Add') {
    

    $stmt = $connect->prepare("INSERT INTO my_accessibilties (user_id, accommodation_id) VALUES (?, ?)");
    $stmt->bind_param("ii", $userId, $accommodationId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Bookmark added successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }

} elseif ($method == 'Delete') {

    $stmt = $connect->prepare("DELETE FROM my_accessibilties WHERE user_id = ? AND accommodation_id = ?");
    $stmt->bind_param("ii", $userId, $accommodationId);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Bookmark removed successfully"]);
    } else {
        echo json_encode(["error" => $stmt->error]);
    }
}


$connect->close();
?>