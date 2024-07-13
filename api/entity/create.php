<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../database.php';
    include_once '../../models/Entity.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate entity object
    $entity = new Entity($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $entity->entity_type = $data->entity_type;
    $entity->entity_name = $data->entity_name;
    $entity->file_path = $data->file_path;
    $entity->rarity = $data->rarity;
    //Set timezone
    date_default_timezone_set('Asia/Jakarta');
    $entity->created_at = date("Y-m-d H:i:s");

    // Create entity
    if($entity->create()) {
        echo json_encode(
            array('message' => 'Entity Created')
        );
    } else { 
        echo json_encode(
            array('message' => 'Entity Not Created')
        );
    }