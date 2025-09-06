<?php
require_once '../config/Database.php';

class AddressApi {
    private $db;

    public function __construct() {
        $connection = new Database();
        $this->db = $connection->getConnection();
    }

    public function getProvinces() {
        $query = "SELECT * FROM provinces where deleted_at is Null";
        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCities($province_id) {
        $query = "SELECT * 
                FROM cities 
                WHERE province_id = :province_id 
                AND deleted_at IS NULL";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':province_id', $province_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getZones($city_id) {
        $query = "SELECT * 
                FROM zones 
                WHERE city_id = :city_id 
                AND deleted_at IS NULL";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':city_id', $city_id, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function save_address($input)
    {
        try{
                    
            $stmt = $this->db->prepare("INSERT INTO addresses (province_id, city_id, zone_id, address) 
                                VALUES (:province, :city, :zone, :address)");
            $stmt->execute([
                ":province" => $input["province"] ?? null,
                ":city"     => $input["city"] ?? null,
                ":zone"     => $input["zone"] ?? null,
                ":address"  => $input["address"] ?? null,
            ]);

            return json_encode(["status" => "success", "message" => "Address saved successfully"]);
        }catch (PDOException $e) {
            return json_encode(["status" => "error", "message" => $e->getMessage()]);
        }
    }

    public function getAddresses()
    {
        $query = "select 
                    a.id,
                    a.address,
                    p.name as prvince_name,
                    c.name as city_name,
                    z.name as zone_name,
                    a.created_at,
                    a.deleted_at
                from addresses as a 
                LEFT JOIN provinces as p on p.id = a.province_id
                LEFT JOIN cities as c on c.id = a.city_id
                LEFT JOIN zones as z on z.id = a.zone_id
                WHERE a.deleted_at IS NULL ORDER BY a.id DESC";

        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

?>