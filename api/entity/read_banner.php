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

    // Get banner name off query
    $banner_name = isset($_GET['banner_name']) ? $_GET['banner_name'] : die();

    // Get entities
    $result = $entity->read_banner($banner_name);

    // Get row count
    $num = $result->rowCount();

    // Check if any entities
    if( $num > 0) {
        // Entity array
        $entities_arr = array();
        $entities_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $entity_item = array(
                'entity_id' => $entity_id,
                'entity_type' => $entity_type,
                'entity_name' => $entity_name,
                'file_path' => $file_path,
                'rarity' => $rarity,
                'created_at' => $entity_created_at,
                'rate_up' => $rate_up
            );

            // Push to "data"
            array_push($entities_arr['data'], $entity_item);
        }

        // Turn to JSON & output
        echo json_encode($entities_arr);

    } else {
        // No entities
        echo json_encode(array('message' => 'No Entities Found'));
    }