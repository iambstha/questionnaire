<?php
require_once 'dbConnection.php';

function insertFormData($name, $email, $answers) {
    try {
        $conn = getDBConnection();

        // Prepare the SQL statement with placeholders
        $sql = "INSERT INTO responses (name, email) VALUES (:name, :email)";

        // Create a prepared statement
        $stmt = $conn->prepare($sql);

        // Bind the parameters to the placeholders
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':answers', $answers);

        // Execute the statement
        $stmt->execute();

        // Close the database connection
        $conn = null;

        return true; // Return true if the insertion is successful
    } catch (PDOException $e) {
        throw new Exception('Error inserting data into the database: ' . $e->getMessage());
    }
}

// Check if the form data is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the form data (name, email, answers)
    $name = $_POST['name'];
    $email = $_POST['email'];
    $answers = $_POST['answers']; // Make sure to handle this data properly (e.g., JSON decoding)

    // Validate the form data (you can add more validation as needed)
    if (empty($name) || empty($email) || empty($answers)) {
        http_response_code(400);
        echo json_encode(array('error' => 'Please fill in all fields.'));
        exit();
    }

    try {
        // Insert the form data into the database
        insertFormData($name, $email, $answers);

        // Return a success response
        http_response_code(200);
        echo json_encode(array('success' => 'Data inserted successfully.'));
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array('error' => $e->getMessage()));
    }
} else {
    http_response_code(405);
    echo json_encode(array('error' => 'Invalid request method.'));
}
?>
