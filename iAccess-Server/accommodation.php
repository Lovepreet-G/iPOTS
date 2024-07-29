<?php
// CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json');

// Include config file
require_once('includes/database.php');
// include('includes/config.php');

$category = isset($_GET['category']) ? $_GET['category'] : 'Work';
$location = isset($_GET['location']) ? $_GET['location'] : 'All';
$medicalCondition =isset($_GET['medicalCondition']) ? $_GET['medicalCondition'] :'Autism';


$response = [];
if($location=="All")
{
    if(isset($medicalCondition))
    {
        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE disability_category = ? And medical_condition = ?");
        if ($stmt) {
            $stmt->bind_param("ss", $category, $medicalCondition);
            $stmt->execute();
            $result = $stmt->get_result();
        
            // Fetch data and process as needed
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    }
    else
    {
        
        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE disability_category = ? ");
        if ($stmt) {
            $stmt->bind_param("s", $category);
            $stmt->execute();
            $result = $stmt->get_result();
        
            // Fetch data and process as needed
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }

    }
}
else
{

    if(isset($medicalCondition))
    {
        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE disability_category = ? AND location = ? And medical_condition = ?");
        if ($stmt) {
            $stmt->bind_param("sss", $category, $location, $medicalCondition);
            $stmt->execute();
            $result = $stmt->get_result();
        
            // Fetch data and process as needed
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    }
    else
    {
        
        $stmt = $connect->prepare("SELECT * FROM `accommodations` WHERE disability_category = ? AND location = ? ");
        if ($stmt) {
            $stmt->bind_param("ss", $category, $location);
            $stmt->execute();
            $result = $stmt->get_result();
        
            // Fetch data and process as needed
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }

    }
}



// Close connection
mysqli_close($connect);

// Send the response as JSON
echo json_encode($response);


?>