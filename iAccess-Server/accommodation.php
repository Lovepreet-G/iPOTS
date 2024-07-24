<?php
header('Content-Type: application/json');

// Include config file
// require_once __DIR__ . '../includes/';
include('includes/database.php');
include('includes/config.php');



$category = isset($_GET['category']) ? $_GET['category'] : '';
$location = isset($_GET['location']) ? $_GET['location'] : '';

$response = [];

// Example query to fetch data based on URL parameters
$query = "SELECT * FROM `accommodations` WHERE disability_category = 'Pain' AND location = 'Work'";
$result = mysqli_query($connect, $query);
// if ($stmt = $mysqli->prepare($sql)) {
//     $stmt->bind_param("ss", $category, $location);
//     $stmt->execute();
//     $result = $stmt->get_result();

    // Fetch data and process as needed
    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }

//     $stmt->close();
// }

// Close connection
// $mysqli->close();
mysqli_close($connect);

// Send the response as JSON
echo json_encode($response);
?>
