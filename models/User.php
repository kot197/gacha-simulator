<?php

class User {
    private $conn;
    private $table = 'users';

    // User properties
    public $user_id;
    public $user_uid; 
    public $created_at;

    // Constructor with DB
    public function __construct($db){
        $this->conn = $db;
    }

    // Get Users
    public function read() {
        // Create Query
        $query = 'SELECT * 
                    FROM users';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    // Create User
    public function create() {
        // Create query
        $query = 'INSERT INTO ' . $this->table . '
            SET
                user_uid = :user_uid,
                created_at = :created_at';

        // Prepared statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->user_uid = htmlspecialchars(strip_tags($this->user_uid));
        $this->created_at = htmlspecialchars(strip_tags($this->created_at));

        // Bind data
        $stmt->bindParam(':user_uid', $this->user_uid);
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