<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../database.php';
    include_once '../../models/User.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate entity object
    $user = new User($db);

    // 
    $result = $user->read();
    // Get row count
    $num = $result->rowCount();

    // Check if any entities
    if( $num > 0) {
        // Entity array
        $users_arr = array();
        $users_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $user_item = array(
                'user_uid' => $user_uid,
                'created_at' => $created_at
            );

            // Push to "data"
            array_push($users_arr['data'], $user_item);
        }

        // Turn to JSON & output
        echo json_encode($users_arr);

    } else {
        // No entities
        echo json_encode(array('message' => 'No Entities Found'));
    }