<?php
include "config.php";

$r = $_GET['r'] ?? 0;

$stmt = $pdo->prepare("SELECT nome, telefone, endereco, google_maps FROM usuario WHERE id = ?");
$stmt->execute([$r]);

echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
exit;