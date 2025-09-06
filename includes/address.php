<?php
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *"); // or use http://localhost:5173 for more security
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once 'api.php';

header('Content-Type: application/json; charset=utf-8');

$addressApi = new AddressApi();

$type = $_GET['type'] ?? null;

switch ($type) {
    case 'provinces':
        echo json_encode($addressApi->getProvinces());
        break;

    case 'cities':
        $province_id = $_GET['province_id'] ?? null;
        if ($province_id) {
            echo json_encode($addressApi->getCities($province_id));
        } else {
            echo json_encode(["error" => "province_id required"]);
        }
        break;

    case 'zones':
        $city_id = $_GET['city_id'] ?? null;
        if ($city_id) {
            echo json_encode($addressApi->getZones($city_id));
        } else {
            echo json_encode(["error" => "city_id required"]);
        }
        break;
    case 'allAddress':
        echo json_encode($addressApi->getAddresses());
        break;

    default:
        echo json_encode(["error" => "Invalid request"]);
}
