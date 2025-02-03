<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        if (isset($_GET['category'])) {
            $category = $_GET['category'];
            $stmt = $pdo->prepare("SELECT * FROM products WHERE category = ?");
            $stmt->execute([$category]);
        } elseif (isset($_GET['campaign'])) {
            $stmt = $pdo->prepare("SELECT * FROM products WHERE is_campaign = true LIMIT 3");
            $stmt->execute();
        } else {
            $stmt = $pdo->prepare("SELECT * FROM products");
            $stmt->execute();
        }
        
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($products);
        
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to fetch products: " . $e->getMessage()]);
    }
}
?>