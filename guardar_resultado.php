<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$host = 'b6fyf9hlqrgzpqkbylqh-mysql.services.clever-cloud.com';
$dbname = 'b6fyf9hlqrgzpqkbylqh';
$user = 'uttavumm7soqtrns';
$password = 'GbUyNP4iZLoalXYizyA';
$port = '20107';

$pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port;charset=utf8", $user, $password);

// Obtener datos del POST
$usuario_id = $_POST['usuario_id'];
$operacion = $_POST['operacion'];
$respuesta = $_POST['respuesta'];
$estado = $_POST['estado'];

// Guardar en la base de datos
$stmt = $pdo->prepare("INSERT INTO resultados (usuario_id, operacion, respuesta, estado) VALUES (?, ?, ?, ?)");
$stmt->execute([$usuario_id, $operacion, $respuesta, $estado]);

echo json_encode(['status' => 'success']);
?>
