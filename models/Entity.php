<?php

class Entity {
    private $conn;
    private $table = 'entities';

    // entity properties
    public $entity_id;
    public $entity_type; 
    public $entity_name;
    public $file_path;
    public $rarity;
    public $created_at;

    // Constructor with DB
    public function __construct($db){
        $this->conn = $db;
    }

    // Get Entities
    public function read() {
        // Create Query
        $query = 'SELECT * 
                    FROM entities';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Execute query
        $stmt->execute();

        return $stmt;
    }

    public function read_single() {
        // Create Query
        $query = 'SELECT * 
                    FROM entities
                    WHERE entity_id = ?
                    LIMIT 0,1';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Bind ID
        $stmt->bindParam(1, $this->entity_id);

        // Execute query
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // Set properties
        $this->entity_id = $row['entity_id'];
        $this->entity_name = $row['entity_name'];
        $this->entity_type = $row['entity_type'];
        $this->file_path = $row['file_path'];
        $this->rarity = $row['rarity'];
        $this->created_at = $row['created_at'];
    }

    // Create Entity
    public function create() {
        // Create query
        $query = 'INSERT INTO ' . $this->table . '
            SET
                entity_type = :entity_type,
                entity_name = :entity_name,
                file_path = :file_path,
                rarity = :rarity,
                created_at = :created_at';

        // Prepared statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->entity_type = htmlspecialchars(strip_tags($this->entity_type));
        $this->entity_name = htmlspecialchars(strip_tags($this->entity_name));
        $this->file_path = htmlspecialchars(strip_tags($this->file_path));
        $this->rarity = htmlspecialchars(strip_tags($this->rarity));
        $this->created_at = htmlspecialchars(strip_tags($this->created_at));

        // Bind data
        $stmt->bindParam(':entity_type', $this->entity_type);
        $stmt->bindParam(':entity_name', $this->entity_name);
        $stmt->bindParam(':file_path', $this->file_path);
        $stmt->bindParam(':rarity', $this->rarity);
        $stmt->bindParam(':created_at', $this->created_at);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s. \n", $stmt->error);

        return false;
    }

    // Update Entity
    public function update() {
        // Create query
        $query = 'UPDATE ' . $this->table . '
            SET
                entity_type = :entity_type,
                entity_name = :entity_name,
                file_path = :file_path,
                rarity = :rarity,
                created_at = :created_at
            WHERE
                entity_id = :entity_id';

        // Prepared statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->entity_type = htmlspecialchars(strip_tags($this->entity_type));
        $this->entity_name = htmlspecialchars(strip_tags($this->entity_name));
        $this->file_path = htmlspecialchars(strip_tags($this->file_path));
        $this->rarity = htmlspecialchars(strip_tags($this->rarity));
        $this->created_at = htmlspecialchars(strip_tags($this->created_at));
        $this->entity_id = htmlspecialchars(strip_tags($this->entity_id));

        // Bind data
        $stmt->bindParam(':entity_type', $this->entity_type);
        $stmt->bindParam(':entity_name', $this->entity_name);
        $stmt->bindParam(':file_path', $this->file_path);
        $stmt->bindParam(':rarity', $this->rarity);
        $stmt->bindParam(':created_at', $this->created_at);
        $stmt->bindParam(':entity_id', $this->entity_id);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s. \n", $stmt->error);

        return false;
    }

    // Delete Entity
    public function delete() {
        // Create query
        $query = 'DELETE FROM {$this->table} WHERE entity_id = :entity_id';

        // Prepared statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->entity_id = htmlspecialchars(strip_tags($this->entity_id));

        // Bind data
        $stmt->bindParam(':entity_id', $this->entity_id);

        // Execute query
        if($stmt->execute()) {
            return true;
        }

        // Print error if something goes wrong
        printf("Error: %s. \n", $stmt->error);

        return false;
    }

    // Get Entities of Firefly Banner
    public function read_banner(string $banner_name) {
        // Create Query
        $query = 'SELECT e.entity_id, e.entity_type, e.entity_name, e.file_path, e.rarity, e.created_at AS entity_created_at,
	        b.banner_id, b.banner_type, b.banner_name, b.created_at AS banner_created_at, eb.rate_up
                FROM entities e
                JOIN entity_banners eb ON e.entity_id = eb.entity_id
                JOIN banners b ON eb.banner_id = b.banner_id
                WHERE b.banner_name = :banner_name';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $banner_name = htmlspecialchars(strip_tags($banner_name));

        // Bind data
        $stmt->bindParam(':banner_name', $banner_name);

        // Execute query
        $stmt->execute();

        return $stmt;
    }
}