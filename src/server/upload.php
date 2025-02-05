<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if (!isset($_FILES['image'])) {
        throw new Exception('No image file uploaded');
    }

    $file = $_FILES['image'];
    $fileName = uniqid() . '-' . basename($file['name']);
    $uploadDir = '../../public/uploads/';
    
    // Create directory if it doesn't exist
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }
    
    $uploadPath = $uploadDir . $fileName;

    // Validate file type
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($file['type'], $allowedTypes)) {
        throw new Exception('Invalid file type. Only JPG, PNG and GIF are allowed.');
    }

    // Increase max file size to 10MB
    if ($file['size'] > 10 * 1024 * 1024) {
        throw new Exception('File too large. Maximum size is 10MB.');
    }

    // Ensure proper permissions
    chmod($uploadDir, 0777);
    
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        throw new Exception('Failed to move uploaded file. Error: ' . error_get_last()['message']);
    }

    // Return the correct path for frontend use
    $imageUrl = '/uploads/' . $fileName;

    echo json_encode([
        'success' => true,
        'imageUrl' => $imageUrl,
        'message' => 'Image uploaded successfully'
    ]);
} catch (Exception $e) {
    error_log('Upload error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>