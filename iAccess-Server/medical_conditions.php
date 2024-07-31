<?php
header('Content-Type: application/json');

// Include config file
// require_once __DIR__ . '../includes/';
include('includes/database.php');
include('includes/config.php');

$letter = $_GET['letter'];
$sql = "SELECT id, term FROM medical_conditions WHERE term LIKE '$letter%'";

$result = mysqli_query($connect, $sql);
// $result = $conn->query($sql);

$conditions = array();

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $conditions[] = $row;
  }
}

echo json_encode($conditions);

mysqli_close($connect);
?>







