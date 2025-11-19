<?php
include "config.php";
session_start();

if (!isset($_SESSION['usuario'])) {
    echo json_encode([]);
    exit;
}

$idUsuario = $_SESSION['usuario'];

//-------TODOS PRATOS-------
$stmt = $pdo->prepare("SELECT * FROM pratos WHERE id_usuario = ? ORDER BY id DESC");
$stmt->execute([$idUsuario]);
$pratos = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($pratos);
exit;
