<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

try {
    if (!isset($_FILES['image'])) {
        throw new Exception('No image file uploaded');
    }

    $file = $_FILES['image'];
    $fileName = uniqid() . '-' . basename($file['name']);
    $uploadDir = '../public/uploads/';
    $uploadPath = $uploadDir . $fileName;

    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        throw new Exception('Failed to move uploaded file');
    }

    $imageUrl = '/uploads/' . $fileName;

    echo json_encode([
        'success' => true,
        'imageUrl' => $imageUrl,
        'message' => 'Image uploaded successfully'
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>