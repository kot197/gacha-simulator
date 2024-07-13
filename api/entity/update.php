<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type,
    Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../database.php';
    include_once '../../models/Entity.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate entity object
    $entity = new Entity($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    // Set ID to update
    $entity->entity_id = $data->entity_id;

    $entity->entity_type = $data->entity_type;
    $entity->entity_name = $data->entity_name;
    $entity->file_path = $data->file_path;
    $entity->rarity = $data->rarity;
    $entity->created_at = $data->created_at;

    // Update entity
    if($entity->update()) {
        echo json_encode(
            array('message' => 'Entity Updated')
        );
    } else { 
        echo json_encode(
            array('message' => 'Entity Not Updated')
        );
    }