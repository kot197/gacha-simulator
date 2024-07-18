<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../database.php';
    include_once '../../models/Warp.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate warp object
    $warp = new Warp($db);

    // 
    $result = $warp->read();
    // Get row count
    $num = $result->rowCount();

    // Check if any entities
    if( $num > 0) {
        // Entity array
        $warps_arr = array();
        $warps_arr['data'] = array();
        $warps_arr['extra'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $warp_item = array(
                'user_uid' => $user_uid,
                'entity_id' => $entity_id,
                'banner_id' => $banner_id,
                'created_at' => $created_at
            );

            // Push to "data"
            array_push($warps_arr['data'], $warp_item);
        }

        $count = array(
            'count' => $num
        );

        // Push Row Count
        array_push($warps_arr['extra'], $count);

        // Turn to JSON & output
        echo json_encode($warps_arr);

    } else {
        // No entities
        echo json_encode(array('message' => 'No Warps Found'));
    }