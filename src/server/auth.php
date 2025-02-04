<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once 'config.php';

// Debug logging function
function debug_log($message, $data = null) {
    error_log("Auth Debug - " . $message . ($data ? ": " . json_encode($data) : ""));
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    debug_log("Received request with data", $data);
    
    if (isset($data->action)) {
        switch ($data->action) {
            case 'login':
                if (isset($data->email) && isset($data->password)) {
                    debug_log("Attempting login for email", $data->email);
                    
                    try {
                        $stmt = $pdo->prepare("SELECT id, email, role, password FROM users WHERE email = ?");
                        $stmt->execute([$data->email]);
                        $user = $stmt->fetch();
                        
                        debug_log("Database query completed", [
                            "userFound" => !empty($user),
                            "hashedPasswordLength" => $user ? strlen($user['password']) : 0
                        ]);
                        
                        if ($user) {
                            // Log password details (for debugging only - remove in production!)
                            debug_log("Password verification attempt", [
                                "providedPassword" => $data->password,
                                "storedHash" => $user['password'],
                                "passwordVerified" => password_verify($data->password, $user['password'])
                            ]);

                            if (password_verify($data->password, $user['password'])) {
                                session_start();
                                $_SESSION['user_id'] = $user['id'];
                                $_SESSION['user_role'] = $user['role'];
                                
                                debug_log("Login successful", [
                                    "userId" => $user['id'],
                                    "role" => $user['role']
                                ]);
                                
                                echo json_encode([
                                    "success" => true,
                                    "user" => [
                                        "id" => $user['id'],
                                        "email" => $user['email'],
                                        "role" => $user['role']
                                    ]
                                ]);
                            } else {
                                debug_log("Password verification failed");
                                http_response_code(401);
                                echo json_encode([
                                    "success" => false,
                                    "error" => "Invalid credentials"
                                ]);
                            }
                        } else {
                            debug_log("User not found");
                            http_response_code(401);
                            echo json_encode([
                                "success" => false,
                                "error" => "Invalid credentials"
                            ]);
                        }
                    } catch (PDOException $e) {
                        debug_log("Database error", $e->getMessage());
                        http_response_code(500);
                        echo json_encode([
                            "success" => false,
                            "error" => "Database error occurred"
                        ]);
                    }
                }
                break;

            case 'checkAuth':
                session_start();
                debug_log("Checking authentication status", [
                    "sessionExists" => isset($_SESSION['user_id']),
                    "userRole" => $_SESSION['user_role'] ?? null
                ]);
                
                if (isset($_SESSION['user_id'])) {
                    echo json_encode([
                        "authenticated" => true,
                        "role" => $_SESSION['user_role']
                    ]);
                } else {
                    echo json_encode([
                        "authenticated" => false,
                        "role" => null
                    ]);
                }
                break;

            case 'getUsers':
                session_start();
                if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'superuser') {
                    http_response_code(403);
                    echo json_encode(["error" => "Access denied"]);
                    break;
                }
                
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
                session_start();
                if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'superuser') {
                    http_response_code(403);
                    echo json_encode(["error" => "Access denied"]);
                    break;
                }

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
                session_start();
                if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 'superuser') {
                    http_response_code(403);
                    echo json_encode(["error" => "Access denied"]);
                    break;
                }

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