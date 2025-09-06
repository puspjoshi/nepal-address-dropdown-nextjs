<?php
error_reporting(E_ALL);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'api.php';

$input = json_decode(file_get_contents("php://input"), true);

$addressApi = new AddressApi();


$res = $addressApi->save_address($input);

echo $res; exit;