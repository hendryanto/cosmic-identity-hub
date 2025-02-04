<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (isset($data->action)) {
        switch ($data->action) {
            case 'login':
                if (isset($data->email) && isset($data->password)) {
                    $stmt = $pdo->prepare("SELECT id, email, role, password FROM users WHERE email = ?");
                    $stmt->execute([$data->email]);
                    $user = $stmt->fetch();
                    
                    if ($user && password_verify($data->password, $user['password'])) {
                        echo json_encode([
                            "success" => true,
                            "user" => [
                                "id" => $user['id'],
                                "email" => $user['email'],
                                "role" => $user['role']
                            ]
                        ]);
                    } else {
                        http_response_code(401);
                        echo json_encode(["error" => "Invalid credentials"]);
                    }
                }
                break;
                
            case 'register':
                if (isset($data->email) && isset($data->password)) {
                    try {
                        $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
                        $stmt = $pdo->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
                        $stmt->execute([$data->email, $hashedPassword, $data->role ?? 'user']);
                        
                        echo json_encode([
                            "success" => true,
                            "message" => "User registered successfully"
                        ]);
                    } catch (PDOException $e) {
                        http_response_code(400);
                        echo json_encode(["error" => "Email already exists"]);
                    }
                }
                break;

            case 'getUsers':
                try {
                    $stmt = $pdo->query("SELECT id, email, role, created_at FROM users");
                    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    echo json_encode([
                        "success" => true,
                        "users" => $users
                    ]);
                } catch (PDOException $e) {
                    http_response_code(500);
                    echo json_encode(["error" => "Failed to fetch users"]);
                }
                break;

            case 'updateRole':
                if (isset($data->userId) && isset($data->role)) {
                    try {
                        $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
                        $stmt->execute([$data->role, $data->userId]);
                        echo json_encode([
                            "success" => true,
                            "message" => "Role updated successfully"
                        ]);
                    } catch (PDOException $e) {
                        http_response_code(500);
                        echo json_encode(["error" => "Failed to update role"]);
                    }
                }
                break;

            case 'addUser':
                if (isset($data->email) && isset($data->password) && isset($data->role)) {
                    try {
                        $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
                        $stmt = $pdo->prepare("INSERT INTO users (email, password, role) VALUES (?, ?, ?)");
                        $stmt->execute([$data->email, $hashedPassword, $data->role]);
                        echo json_encode([
                            "success" => true,
                            "message" => "User added successfully"
                        ]);
                    } catch (PDOException $e) {
                        http_response_code(400);
                        echo json_encode(["error" => "Failed to add user"]);
                    }
                }
                break;
        }
    }
}
?>