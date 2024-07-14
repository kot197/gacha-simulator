<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../database.php';
    include_once '../../models/User.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate entity object
    $user = new User($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $user->user_uid = $data->user_uid;
    //Set timezone
    date_default_timezone_set('Asia/Jakarta');
    $user->created_at = date("Y-m-d H:i:s");

    // Create user
    if($user->create()) {
        echo json_encode(
            array('message' => 'User Created')
        );
    } else { 
        echo json_encode(
            array('message' => 'User Not Created')
        );
    }