<?php
include "config.php";

session_start();
$idUsuario = $_SESSION['usuario'] ?? null;

if (!$idUsuario) {
    echo json_encode(["status" => "erro", "mensagem" => "Acesso negado. Usuário não autenticado."]);
    exit;
}
$id = $_GET['id'];
$stmt = $pdo->prepare("SELECT * FROM pratos WHERE id = ? AND id_usuario = ?");
$stmt->execute([$id, $idUsuario]);
echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
//echo json_encode(["status" => "sucesso"]);