<?php

    class Database{
        private $host = 'localhost';
        private $user = 'root';
        private $password = 'password';
        private $db_name = 'nepal_address';
        private $charset = 'utf8mb4';
        private $connection;
        public function __construct()
        {
            $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset={$this->charset}";
            try{
                $this->connection = new PDO($dsn, $this->user,$this->password);
                $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch( PDOException $e){
                die("Fail connection: ".$e->getMessage());
            }
        }

        public function getConnection()
        {
            return $this->connection;
        }

    }

?>