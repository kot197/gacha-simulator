<?php

class Warp {
    private $conn;
    private $table = 'warp_records';

    // Warp properties
    public $warp_id;
    public $user_uid; 
    public $entity_id;
    public $banner_id;
    public $created_at;
    public $warp_limit;
    public $warp_skip;

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

    // Get a set of Warps on single banner based on page param
    public function read_banner_page() {
        // Create Query
        $query = "SELECT * FROM warp_records
	                WHERE banner_id = :banner_id
                    ORDER BY created_at ASC, warp_id ASC
                    LIMIT :warp_limit OFFSET :warp_skip
                    ";

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->banner_id = htmlspecialchars(strip_tags($this->banner_id));
        $this->warp_limit = (int) htmlspecialchars(strip_tags($this->warp_limit));
        $this->warp_skip = (int) htmlspecialchars(strip_tags($this->warp_skip));

        // Bind data
        $stmt->bindParam(':banner_id', $this->banner_id);
        $stmt->bindParam(':warp_limit', $this->warp_limit, PDO::PARAM_INT);
        $stmt->bindParam(':warp_skip', $this->warp_skip, PDO::PARAM_INT);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Create Warp
    public function create() {
        // Create query
        $query = 'INSERT INTO ' . $this->table . '
            SET
                user_uid = :user_uid,
                entity_id = :entity_id,
                banner_id = :banner_id,
                created_at = :created_at';

        // Prepared statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->user_uid = htmlspecialchars(strip_tags($this->user_uid));
        $this->entity_id = htmlspecialchars(strip_tags($this->entity_id));
        $this->banner_id = htmlspecialchars(strip_tags($this->banner_id));
        $this->created_at = htmlspecialchars(strip_tags($this->created_at));

        // Bind data
        $stmt->bindParam(':user_uid', $this->user_uid);
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

    // Count Rows in Warp Table
    public function count() {
        $query = "SELECT COUNT(*) AS count
                    FROM " . $this->table;

        // Prepared statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
}