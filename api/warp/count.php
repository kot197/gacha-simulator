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

    $result = $warp->count();

    $warps_arr = array();
    $warps_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $warp_item = array(
            'count' => $count
        );

        // Push to "data"
        array_push($warps_arr['data'], $warp_item);
    }

    // Turn to JSON & output
    echo json_encode($warps_arr);