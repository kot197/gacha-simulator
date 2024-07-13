<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: DELETE');
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

    // Delete entity
    if($entity->delete()) {
        echo json_encode(
            array('message' => 'Entity Deleted')
        );
    } else { 
        echo json_encode(
            array('message' => 'Entity Not Deleted')
        );
    }