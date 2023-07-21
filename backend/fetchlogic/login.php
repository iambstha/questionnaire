<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

// Read the raw input data
$data = file_get_contents('php://input');

// Decode the JSON data into an associative array
$input_data = json_decode($data, true);

// Check if "name" and "email" keys exist in the input data
if (isset($input_data['name']) && isset($input_data['email'])) {
  $name = $input_data['name'];
  $email = $input_data['email'];

  // Perform your login logic here, e.g., checking user credentials in the database
  // For demonstration purposes, let's assume a simple success case
  // Replace this with your actual login logic
  if ($name === 'Bishal Shrestha' && $email === 'iambstha@gmail.com') {
    $success = true;
  } else {
    $success = false;
  }

  // Return a JSON response with the success status
  header('Content-Type: application/json');
  echo json_encode(array('success' => $success));
} else {
  // If "name" and/or "email" keys are missing, return an error response
  http_response_code(400);
  echo json_encode(array('error' => 'Invalid request data'));
}
?>
