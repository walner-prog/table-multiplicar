<?php
$host = 'b6fyf9hlqrgzpqkbylqh-mysql.services.clever-cloud.com';
$dbname = 'b6fyf9hlqrgzpqkbylqh';
$user = 'uttavumm7soqtrns';
$pass = 'GbUyNP4iZLoalXYizyA';
$port = 20107;

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;port=$port", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error en la conexión: " . $e->getMessage());
}
?>
