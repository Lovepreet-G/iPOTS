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
$location = isset($_GET['location']) ? $_GET['location'] : '';
$medicalCondition =isset($_GET['medicalCondition']) ? $_GET['medicalCondition'] :NULL;


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

}elseif ($method == 'showAll') {
    $response = [];

    // Check if the location is "All"
    if ($location == "All") {
        // If medicalCondition is set
        if (isset($medicalCondition)) {
            $stmt = $connect->prepare("
                SELECT a.* 
                FROM accommodations a 
                JOIN my_accessibilties ma ON a.id = ma.accommodation_id 
                WHERE ma.user_id = ? 
                AND a.medical_condition = ?");
            
            if ($stmt) {
                $stmt->bind_param("is", $userId, $medicalCondition);
                $stmt->execute();
                $result = $stmt->get_result();
    
                while ($row = $result->fetch_assoc()) {
                    $response[] = $row;
                }
                $stmt->close();
            }
        } else {
            $stmt = $connect->prepare("
                SELECT a.* 
                FROM accommodations a 
                JOIN my_accessibilties ma ON a.id = ma.accommodation_id 
                WHERE ma.user_id = ?");
            
            if ($stmt) {
                $stmt->bind_param("i", $userId);
                $stmt->execute();
                $result = $stmt->get_result();
    
                while ($row = $result->fetch_assoc()) {
                    $response[] = $row;
                }
                $stmt->close();
            }
        }
    } else {
        // If medicalCondition is set
        if (isset($medicalCondition)) {
            $stmt = $connect->prepare("
                SELECT a.* 
                FROM accommodations a 
                JOIN my_accessibilties ma ON a.id = ma.accommodation_id 
                WHERE ma.user_id = ? 
                AND a.location = ? 
                AND a.medical_condition = ?");
            
            if ($stmt) {
                $stmt->bind_param("iss", $userId, $location, $medicalCondition);
                $stmt->execute();
                $result = $stmt->get_result();
    
                while ($row = $result->fetch_assoc()) {
                    $response[] = $row;
                }
                $stmt->close();
            }
        } else {
            $stmt = $connect->prepare("
                SELECT a.* 
                FROM accommodations a 
                JOIN my_accessibilties ma ON a.id = ma.accommodation_id 
                WHERE ma.user_id = ? 
                AND a.location = ?");
            
            if ($stmt) {
                $stmt->bind_param("is", $userId, $location);
                $stmt->execute();
                $result = $stmt->get_result();
    
                while ($row = $result->fetch_assoc()) {
                    $response[] = $row;
                }
                $stmt->close();
            }
        }
    }
    
    echo json_encode($response);    
}
 
elseif ($method == 'Add') {
    

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
elseif ($method == 'Category')
{
    $response = [];
    // If medicalCondition is set
    if (isset($medicalCondition)) {
        $stmt = $connect->prepare("
            SELECT DISTINCT a.disability_category
            FROM accommodations a 
            JOIN my_accessibilties ma ON a.id = ma.accommodation_id 
            WHERE ma.user_id = ? 
            AND a.location = ? 
            AND a.medical_condition = ?");
        
        if ($stmt) {
            $stmt->bind_param("iss", $userId, $location, $medicalCondition);
            $stmt->execute();
            $result = $stmt->get_result();

            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    } else {
        $stmt = $connect->prepare("
            SELECT DISTINCT a.disability_category 
            FROM accommodations a 
            JOIN my_accessibilties ma ON a.id = ma.accommodation_id 
            WHERE ma.user_id = ? 
            AND a.location = ?");
        
        if ($stmt) {
            $stmt->bind_param("is", $userId, $location);
            $stmt->execute();
            $result = $stmt->get_result();

            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            $stmt->close();
        }
    }
    echo json_encode($response);
}


$connect->close();
?>