<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Get POST data
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate required fields
        if (!isset($data['name']) || !isset($data['category']) || !isset($data['price'])) {
            throw new Exception('Missing required fields');
        }
        
        // Check if product name already exists
        $checkStmt = $pdo->prepare("SELECT COUNT(*) as count FROM products WHERE name = ?");
        $checkStmt->execute([$data['name']]);
        $exists = $checkStmt->fetch(PDO::FETCH_ASSOC)['count'] > 0;
        
        if ($exists) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "A product with this name already exists",
                "error" => true
            ]);
            exit();
        }
        
        // Ensure features and whatsInTheBox are arrays before encoding
        $features = isset($data['features']) ? (array)$data['features'] : [];
        $whatsInTheBox = isset($data['whatsInTheBox']) ? (array)$data['whatsInTheBox'] : [];
        
        // Insert new product
        $stmt = $pdo->prepare("
            INSERT INTO products (
                name, description, category, price, 
                features, whatsInTheBox, warranty, manual, 
                image
            ) VALUES (
                :name, :description, :category, :price,
                :features, :whatsInTheBox, :warranty, :manual,
                :image
            )
        ");
        
        $stmt->execute([
            ':name' => $data['name'],
            ':description' => $data['description'] ?? '',
            ':category' => $data['category'],
            ':price' => $data['price'],
            ':features' => json_encode($features),
            ':whatsInTheBox' => json_encode($whatsInTheBox),
            ':warranty' => $data['warranty'] ?? '',
            ':manual' => $data['manual'] ?? '',
            ':image' => $data['images'][0] ?? null
        ]);
        
        $productId = $pdo->lastInsertId();
        
        echo json_encode([
            "success" => true,
            "message" => "Product saved successfully",
            "id" => $productId
        ]);
        
    } else {
        // Handle GET requests
        if (isset($_GET['category'])) {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ?");
            $stmt->execute([$_GET['category']]);
        } else if (isset($_GET['campaign'])) {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE is_campaign = 1");
            $stmt->execute();
        } else {
            $stmt = $pdo->query("SELECT * FROM products");
        }
        
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Properly decode JSON strings from database
        foreach ($products as &$product) {
            $features = $product['features'];
            $whatsInTheBox = $product['whatsInTheBox'];
            
            // Ensure valid JSON before decoding
            $product['features'] = json_decode($features) ?: [];
            $product['whatsInTheBox'] = json_decode($whatsInTheBox) ?: [];
            
            // Convert to arrays if they're objects
            if (is_object($product['features'])) {
                $product['features'] = (array)$product['features'];
            }
            if (is_object($product['whatsInTheBox'])) {
                $product['whatsInTheBox'] = (array)$product['whatsInTheBox'];
            }
        }
        
        echo json_encode([
            "success" => true,
            "message" => "Products retrieved successfully",
            "data" => $products
        ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error: " . $e->getMessage(),
        "error" => true
    ]);
}
?>