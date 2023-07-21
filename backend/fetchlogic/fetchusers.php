<?php
require '../dbConnection.php';

function fecthUsers() {
    try{
        $conn = getDBConnection();
        $stmt = $conn->query("SELECT * FROM users");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null;

        return $results;
    }
    catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array('error' => 'Database error: ' . $e->getMessage()));
    }
}
