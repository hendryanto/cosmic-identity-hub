<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function handleError($message) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $message
    ]);
    exit();
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM events ORDER BY date DESC");
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Convert images string to array
            foreach ($events as &$event) {
                $event['images'] = $event['images'] ? explode(',', $event['images']) : [];
            }
            
            echo json_encode($events);
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
        
    case 'POST':
        try {
            $data = json_decode(file_get_contents("php://input"));
            $images = isset($data->images) ? implode(',', $data->images) : '';
            
            $stmt = $pdo->prepare(
                "INSERT INTO events (title, description, date, content, images) 
                 VALUES (?, ?, ?, ?, ?)"
            );
            
            $stmt->execute([
                $data->title,
                $data->description,
                $data->date,
                $data->content,
                $images
            ]);
            
            echo json_encode([
                "success" => true,
                "id" => $pdo->lastInsertId()
            ]);
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
        
    case 'PUT':
        try {
            $data = json_decode(file_get_contents("php://input"));
            $images = isset($data->images) ? implode(',', $data->images) : '';
            
            $stmt = $pdo->prepare(
                "UPDATE events 
                 SET title = ?, description = ?, date = ?, content = ?, images = ?
                 WHERE id = ?"
            );
            
            $stmt->execute([
                $data->title,
                $data->description,
                $data->date,
                $data->content,
                $images,
                $data->id
            ]);
            
            echo json_encode(["success" => true]);
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
        
    case 'DELETE':
        try {
            $id = $_GET['id'] ?? null;
            if (!$id) {
                handleError("No ID provided");
            }
            
            $stmt = $pdo->prepare("DELETE FROM events WHERE id = ?");
            $stmt->execute([$id]);
            
            echo json_encode(["success" => true]);
        } catch (PDOException $e) {
            handleError($e->getMessage());
        }
        break;
}
?>