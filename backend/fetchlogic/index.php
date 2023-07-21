<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST'); // Add other allowed methods if needed (e.g., GET, PUT, DELETE)
header('Access-Control-Allow-Headers: Content-Type'); // Add other allowed headers if needed
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  require 'fetchusers.php';
  $data = fecthusers();

  header('Content-Type: application/json');
  echo json_encode($data);
}
