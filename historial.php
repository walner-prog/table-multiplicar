<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$host = 'b6fyf9hlqrgzpqkbylqh-mysql.services.clever-cloud.com';
$dbname = 'b6fyf9hlqrgzpqkbylqh';
$user = 'uttavumm7soqtrns';
$password = 'GbUyNP4iZLoalXYizyA';
$port = '20107';

$pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port;charset=utf8", $user, $password);

// Obtener el usuario_id de la consulta
$usuario_id = $_GET['usuario_id'];

// Obtener historial
$stmt = $pdo->prepare("SELECT operacion, respuesta, estado FROM resultados WHERE usuario_id = ?");
$stmt->execute([$usuario_id]);

$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($results);
?>
