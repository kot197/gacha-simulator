<?php

class Warp {
    private $conn;
    private $table = 'warp_records';

    // Warp properties
    public $warp_id;
    public $user_id; 
    public $entity_id;
    public $banner_id;
    public $created_at;

    // Constructor with DB
    public function __construct($db){
        $this->conn = $db;
    }

    // Get Warps
    public function read() {
        // Create Query
        $query = 'SELECT * 
                    FROM warp_records';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Create Warp
    public function create() {
        // Create query
        $query = 'INSERT INTO ' . $this->table . '
            SET
                user_id = :user_id,
                entity_id = :entity_id,
                banner_id = :banner_id,
                created_at = :created_at';

        // Prepared statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->entity_id = htmlspecialchars(strip_tags($this->entity_id));
        $this->banner_id = htmlspecialchars(strip_tags($this->banner_id));
        $this->created_at = htmlspecialchars(strip_tags($this->created_at));

        // Bind data
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':entity_id', $this->entity_id);
        $stmt->bindParam(':banner_id', $this->banner_id);
        $stmt->bindParam(':created_at', $this->created_at);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s. \n", $stmt->error);

        return false;
    }
}