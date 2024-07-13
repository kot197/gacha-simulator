<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../database.php';
    include_once '../../models/Entity.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate entity object
    $entity = new Entity($db);

    // Get ID
    $entity->entity_id = isset($_GET['id']) ? $_GET['id'] : die();

    // Get entity
    $entity->read_single();

    // Create array
    $entity_arr = array(
        'entity_id' => $entity->entity_id,
        'entity_type' => $entity->entity_type,
        'entity_name' => $entity->entity_name,
        'file_path' => $entity->file_path,
        'rarity' => $entity->rarity,
        'created_at' => $entity->created_at
    );

    // Make JSON
    print_r(json_encode($entity_arr));