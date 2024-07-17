<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../database.php';
    include_once '../../models/Warp.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate entity object
    $warp = new Warp($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $warp->user_uid = $data->user_uid;
    $warp->entity_id = $data->entity_id;
    $warp->banner_id = $data->banner_id;
    //Set timezone
    date_default_timezone_set('Asia/Jakarta');
    $warp->created_at = date("Y-m-d H:i:s");

    // Create user
    if($warp->create()) {
        echo json_encode(
            array('message' => 'Warp Created')
        );
    } else { 
        echo json_encode(
            array('message' => 'Warp Not Created')
        );
    }