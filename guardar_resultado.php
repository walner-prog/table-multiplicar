<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario_id = $_POST['usuario_id'];
    $operacion = $_POST['operacion'];
    $respuesta = $_POST['respuesta'];
    $estado = $_POST['estado'];

    $sql = "INSERT INTO resultados (usuario_id, operacion, respuesta, estado) VALUES (:usuario_id, :operacion, :respuesta, :estado)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        'usuario_id' => $usuario_id,
        'operacion' => $operacion,
        'respuesta' => $respuesta,
        'estado' => $estado
    ]);

    echo json_encode(['success' => true]);
}
?>
